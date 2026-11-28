"""Earth trade-route builder for EARTH.blend (Blender 5.x).

Run from Blender's Text Editor (or via MCP). Safe to re-run: it rebuilds
routes, markers, timing keyframes; it never touches the Earth mesh/materials.

Edit ROUTES / TIMING below, then run again.
"""
import bpy, math
from mathutils import Vector

# ---------------------------------------------------------------- settings
FPS = 24
# draw = segments appear one by one A->B, hold = fully visible,
# fade = whole route + destination dot fade out, pause = rest of the loop.
# cycle length = draw + hold + fade + pause; each route is offset inside it
TIMING = dict(draw=5.5, hold=1.5, fade=2.5, pause=4.5)   # seconds
ROTATION_CYCLES = 4          # one full Earth turn lasts this many route cycles
EARTH_RADIUS = 1.0
SURFACE_OFFSET = 0.012       # lift above surface (prevents z-fighting)

CITIES = {
    "Mumbai":    (19.0760, 72.8777),
    "London":    (51.5072, -0.1276),
    "Singapore": (1.3521, 103.8198),
    "Dubai":     (25.2048, 55.2708),
    "NewYork":   (40.7128, -74.0060),
    "Tokyo":     (35.6762, 139.6503),
    "Shanghai":  (31.2304, 121.4737),
    "Rotterdam": (51.9244, 4.4777),
    "Santos":    (-23.9608, -46.3336),
    "Durban":    (-29.8587, 31.0218),
    "Chennai":   (13.0827, 80.2707),
    "Kolkata":   (22.5726, 88.3639),
    "Mundra":    (22.8390, 69.7210),
    "Hamburg":   (53.5511, 9.9937),
    "Jeddah":    (21.4858, 39.1925),
    "HongKong":  (22.3193, 114.1694),
    "Colombo":   (6.9271, 79.8612),
    "Lagos":     (6.5244, 3.3792),
    "LosAngeles": (34.0522, -118.2437),
    "Sydney":    (-33.8688, 151.2093),
    "Busan":     (35.1796, 129.0756),
    "Mombasa":   (-4.0435, 39.6682),
    "CapeTown":  (-33.9249, 18.4241),
    "Vancouver": (49.2827, -123.1207),
    "Panama":    (9.3547, -79.9015),
    "Melbourne": (-37.8136, 144.9631),
    "Antwerp":   (51.2194, 4.4025),
    "Jakarta":   (-6.2088, 106.8456),
    "Houston":   (29.7604, -95.3698),
}
# (from, to, start offset in seconds[, draw, hold, fade]). Any offset works: it wraps around the loop.
# The optional per-route draw/hold/fade (seconds) override TIMING; draw+hold+fade must stay below one cycle.
ROUTES = [
    ("Mumbai", "London", 0.0),
    ("Singapore", "Tokyo", 2.3),
    ("Dubai", "Singapore", 4.1),
    ("London", "NewYork", 6.4),
    ("Shanghai", "Singapore", 8.2),
    ("Rotterdam", "Santos", 10.0),
    ("Durban", "Mumbai", 12.1),
    ("Mundra", "Hamburg", 1.1, 6.5, 1.5, 2.5),
    ("Chennai", "Sydney", 3.2, 6.0, 2.0, 2.0),
    ("Kolkata", "HongKong", 5.3, 4.5, 1.0, 2.0),
    ("Colombo", "Jeddah", 7.4, 5.0, 1.5, 3.0),
    ("Mumbai", "Mombasa", 9.1, 4.5, 2.0, 2.5),
    ("HongKong", "LosAngeles", 11.0, 7.0, 1.5, 2.5),
    ("Lagos", "Antwerp", 13.2, 5.5, 1.0, 2.0),
    ("Busan", "Vancouver", 0.6, 6.5, 2.0, 2.0),
    ("Houston", "Rotterdam", 2.9, 6.0, 1.5, 3.0),
    ("CapeTown", "Santos", 4.8, 5.5, 2.0, 2.0),
    ("Jakarta", "Melbourne", 6.9, 4.5, 1.5, 2.5),
    ("Panama", "Shanghai", 8.7, 7.0, 1.0, 2.5),
    ("Chennai", "Singapore", 10.6, 4.0, 1.5, 2.0),
    ("Jeddah", "Rotterdam", 12.6, 5.5, 2.0, 2.5),
]

def route_timing(r):
    """(from, to, offset, timing dict) for a ROUTES entry."""
    t = dict(TIMING)
    if len(r) >= 6:
        t.update(draw=r[3], hold=r[4], fade=r[5])
    return r[0], r[1], r[2], t
SEGMENT = dict(spacing=0.026, length=0.015, width=0.005, height=0.0025)
CYAN = (0.5, 0.75, 1.0, 1.0)       # soft icy blue
ROUTE_GLOW = 1.5                   # emission strength of route bars
MARKER_GLOW = 1.5
MARKER_POP_FRAMES = 8              # dot scale-in duration

# ---------------------------------------------------------------- helpers
def latlon_to_vec(lat, lon, r=1.0):
    # Calibrated against the Earth UVs: u = (atan2(y,x)+180)/360 -> lon = atan2(y,x)
    la, lo = math.radians(lat), math.radians(lon)
    return Vector((math.cos(la) * math.cos(lo), math.cos(la) * math.sin(lo), math.sin(la))) * r

def coll(name, parent):
    c = bpy.data.collections.get(name) or bpy.data.collections.new(name)
    if c.name not in parent.children:
        parent.children.link(c)
    return c

def move_to(obj, c):
    for old in list(obj.users_collection):
        old.objects.unlink(obj)
    c.objects.link(obj)

def emission_mat(name, color, strength):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    e = nt.nodes.new("ShaderNodeEmission")
    e.inputs["Color"].default_value = color
    e.inputs["Strength"].default_value = strength
    # per-object opacity: reads the object's custom property "fade" (1 = visible)
    at = nt.nodes.new("ShaderNodeAttribute"); at.attribute_type = "OBJECT"; at.attribute_name = "fade"
    tr = nt.nodes.new("ShaderNodeBsdfTransparent")
    mx = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(at.outputs["Fac"], mx.inputs[0])
    nt.links.new(tr.outputs[0], mx.inputs[1]); nt.links.new(e.outputs[0], mx.inputs[2])
    nt.links.new(mx.outputs[0], out.inputs[0])
    try:
        m.surface_render_method = "BLENDED"
    except Exception:
        m.blend_method = "BLEND"
    return m

# ---------------------------------------------------------------- node group
def route_node_group():
    name = "GN_RouteSegments"
    if name in bpy.data.node_groups:
        bpy.data.node_groups.remove(bpy.data.node_groups[name])
    g = bpy.data.node_groups.new(name, "GeometryNodeTree")
    I = g.interface
    I.new_socket("Geometry", in_out="INPUT", socket_type="NodeSocketGeometry")
    def fin(n, d, mn=0.0, mx=1.0):
        s = I.new_socket(n, in_out="INPUT", socket_type="NodeSocketFloat")
        s.default_value = d; s.min_value = mn; s.max_value = mx
        return s
    fin("Reveal", 0.0); fin("Erase", 0.0)
    fin("Spacing", SEGMENT["spacing"], 0.001, 1); fin("Length", SEGMENT["length"], 0.0001, 1)
    fin("Width", SEGMENT["width"], 0.0001, 1); fin("Height", SEGMENT["height"], 0.0001, 1)
    fin("Grow Softness", 0.03, 0.0001, 1)
    ms = I.new_socket("Material", in_out="INPUT", socket_type="NodeSocketMaterial")
    I.new_socket("Geometry", in_out="OUTPUT", socket_type="NodeSocketGeometry")
    N, L = g.nodes, g.links
    gi = N.new("NodeGroupInput"); go = N.new("NodeGroupOutput")
    res = N.new("GeometryNodeResampleCurve"); res.inputs["Mode"].default_value = "Length"
    L.new(gi.outputs["Geometry"], res.inputs["Curve"]); L.new(gi.outputs["Spacing"], res.inputs["Length"])
    # factor along route, captured before converting to points
    par = N.new("GeometryNodeSplineParameter")
    tan = N.new("GeometryNodeInputTangent")
    cap = N.new("GeometryNodeCaptureAttribute")
    cap.capture_items.new("FLOAT", "Factor"); cap.capture_items.new("VECTOR", "Tangent")
    L.new(res.outputs[0], cap.inputs[0])
    L.new(par.outputs["Factor"], cap.inputs["Factor"]); L.new(tan.outputs[0], cap.inputs["Tangent"])
    c2p = N.new("GeometryNodeCurveToPoints"); c2p.mode = "EVALUATED"
    L.new(cap.outputs[0], c2p.inputs["Curve"])
    fac = cap.outputs["Factor"]
    # visible window:  Erase <= factor <= Reveal
    gt = N.new("FunctionNodeCompare"); gt.data_type = "FLOAT"; gt.operation = "GREATER_THAN"
    L.new(fac, gt.inputs[0]); L.new(gi.outputs["Reveal"], gt.inputs[1])
    lt = N.new("FunctionNodeCompare"); lt.data_type = "FLOAT"; lt.operation = "LESS_THAN"
    L.new(fac, lt.inputs[0]); L.new(gi.outputs["Erase"], lt.inputs[1])
    orb = N.new("FunctionNodeBooleanMath"); orb.operation = "OR"
    L.new(gt.outputs[0], orb.inputs[0]); L.new(lt.outputs[0], orb.inputs[1])
    # Reveal == 0 means nothing shown at all
    z = N.new("FunctionNodeCompare"); z.data_type = "FLOAT"; z.operation = "LESS_EQUAL"
    L.new(gi.outputs["Reveal"], z.inputs[0]); z.inputs[1].default_value = 0.0
    orb2 = N.new("FunctionNodeBooleanMath"); orb2.operation = "OR"
    L.new(orb.outputs[0], orb2.inputs[0]); L.new(z.outputs[0], orb2.inputs[1])
    dele = N.new("GeometryNodeDeleteGeometry"); dele.domain = "POINT"
    L.new(c2p.outputs["Points"], dele.inputs["Geometry"]); L.new(orb2.outputs[0], dele.inputs["Selection"])
    # orientation: X along tangent, Z along surface normal (position)
    pos = N.new("GeometryNodeInputPosition")
    nrm = N.new("ShaderNodeVectorMath"); nrm.operation = "NORMALIZE"; L.new(pos.outputs[0], nrm.inputs[0])
    a1 = N.new("FunctionNodeAlignRotationToVector"); a1.axis = "X"
    L.new(cap.outputs["Tangent"], a1.inputs["Vector"])
    a2 = N.new("FunctionNodeAlignRotationToVector"); a2.axis = "Z"; a2.pivot_axis = "X"
    L.new(a1.outputs[0], a2.inputs["Rotation"]); L.new(nrm.outputs[0], a2.inputs["Vector"])
    # head segment grows in, tail segment shrinks out (smooth, still sequential)
    def ramp(a, b):
        sub = N.new("ShaderNodeMath"); sub.operation = "SUBTRACT"
        L.new(a, sub.inputs[0]); L.new(b, sub.inputs[1])
        div = N.new("ShaderNodeMath"); div.operation = "DIVIDE"; div.use_clamp = True
        L.new(sub.outputs[0], div.inputs[0]); L.new(gi.outputs["Grow Softness"], div.inputs[1])
        return div.outputs[0]
    grow = ramp(gi.outputs["Reveal"], fac)
    shrink = ramp(fac, gi.outputs["Erase"])
    mn = N.new("ShaderNodeMath"); mn.operation = "MINIMUM"
    L.new(grow, mn.inputs[0]); L.new(shrink, mn.inputs[1])
    cube = N.new("GeometryNodeMeshCube")
    cv = N.new("ShaderNodeCombineXYZ")
    L.new(gi.outputs["Length"], cv.inputs[0]); L.new(gi.outputs["Width"], cv.inputs[1]); L.new(gi.outputs["Height"], cv.inputs[2])
    L.new(cv.outputs[0], cube.inputs["Size"])
    inst = N.new("GeometryNodeInstanceOnPoints")
    L.new(dele.outputs[0], inst.inputs["Points"]); L.new(cube.outputs["Mesh"], inst.inputs["Instance"])
    L.new(a2.outputs[0], inst.inputs["Rotation"]); L.new(mn.outputs[0], inst.inputs["Scale"])
    real = N.new("GeometryNodeRealizeInstances"); L.new(inst.outputs[0], real.inputs[0])
    sm = N.new("GeometryNodeSetMaterial")
    L.new(real.outputs[0], sm.inputs["Geometry"]); L.new(gi.outputs["Material"], sm.inputs["Material"])
    L.new(sm.outputs[0], go.inputs[0])
    for i, n in enumerate(N):
        n.location = (i * 180, 0)
    return g

# ---------------------------------------------------------------- build
def build():
    scn = bpy.context.scene
    scn.render.fps = FPS
    root = coll("Earth Scene", scn.collection)
    c_model = coll("Earth Model", root); c_ctrl = coll("Earth Rotation Controller", root)
    c_routes = coll("Route Animations", root); c_marks = coll("Location Markers", root)
    c_light = coll("Lighting", root); c_cam = coll("Camera", root); coll("Background", root)

    earth = bpy.data.objects.get("Earth") or bpy.data.objects["Sphere"]
    earth.name = "Earth"
    atm = bpy.data.objects.get("Atmosphere")
    move_to(earth, c_model)
    if atm: move_to(atm, c_model)
    for o in list(bpy.data.objects):
        if o.type == "LIGHT": move_to(o, c_light)
        if o.type == "CAMERA": move_to(o, c_cam)
    old = bpy.data.collections.get("Collection")
    if old and not old.objects and not old.children:
        bpy.data.collections.remove(old)

    ctrl = bpy.data.objects.get("Earth_Rotation_Controller")
    if not ctrl:
        ctrl = bpy.data.objects.new("Earth_Rotation_Controller", None)
        ctrl.empty_display_type = "SPHERE"; ctrl.empty_display_size = 1.3
        c_ctrl.objects.link(ctrl)
    ctrl.location = (0, 0, 0)
    earth.parent = ctrl; earth.matrix_parent_inverse.identity()

    # clear previous routes / markers
    for c in (c_routes, c_marks):
        for o in list(c.objects):
            bpy.data.objects.remove(o, do_unlink=True)

    g = route_node_group()
    seg_mat = emission_mat("Route_Segment_Cyan", CYAN, ROUTE_GLOW)
    mark_mat = emission_mat("Marker_Cyan", CYAN, MARKER_GLOW)
    for it in g.interface.items_tree:
        if getattr(it, "name", "") == "Material":
            it.default_value = seg_mat

    t = TIMING
    cycle = round((t["draw"] + t["hold"] + t["fade"] + t["pause"]) * FPS)
    total = cycle * ROTATION_CYCLES
    scn.frame_start, scn.frame_end = 1, total

    # Earth rotation: linear, seamless (frame_end+1 == frame_start + 360deg)
    ctrl.animation_data_clear()
    ctrl.rotation_euler = (0, 0, 0); ctrl.keyframe_insert("rotation_euler", index=2, frame=1)
    ctrl.rotation_euler = (0, 0, math.tau); ctrl.keyframe_insert("rotation_euler", index=2, frame=total + 1)
    fc = ctrl.animation_data.action.fcurves[0] if hasattr(ctrl.animation_data.action, "fcurves") else None
    _set_linear_cycle(ctrl, cycles=True)

    _build_routes(ctrl, c_routes, c_marks, g, seg_mat, mark_mat, cycle)
    return dict(cycle=cycle, total=total, routes=len(ROUTES))

def _build_routes(ctrl, c_routes, c_marks, g, seg_mat, mark_mat, cycle):
    used = set()
    for entry in ROUTES:
        a, b, off, tm = route_timing(entry)
        lat1, lon1 = CITIES[a]; lat2, lon2 = CITIES[b]
        used.update((a, b))
        p1, p2 = latlon_to_vec(lat1, lon1), latlon_to_vec(lat2, lon2)
        ang = p1.angle(p2)
        lift = 0.03 + 0.26 * ang / math.pi
        n = 96
        cu = bpy.data.curves.new(f"Route_{a}_{b}", "CURVE"); cu.dimensions = "3D"
        sp = cu.splines.new("POLY"); sp.points.add(n - 1)
        for i in range(n):
            f = i / (n - 1)
            d = p1.slerp(p2, f) if hasattr(p1, "slerp") else _slerp(p1, p2, f)
            r = EARTH_RADIUS + SURFACE_OFFSET + lift * math.sin(math.pi * f)
            sp.points[i].co = (*(d.normalized() * r), 1)
        ob = bpy.data.objects.new(f"Route_{a}_to_{b}", cu)
        c_routes.objects.link(ob); ob.parent = ctrl
        mod = ob.modifiers.new("RouteSegments", "NODES"); mod.node_group = g
        ids = {s.name: s.identifier for s in g.interface.items_tree if getattr(s, "in_out", "") == "INPUT"}
        ob["route_offset_s"] = off
        _key_route(ob, mod, ids, off, cycle, tm)
        _destination_dot(b, a, off, cycle, ctrl, c_marks, mark_mat, tm)

def rebuild_routes():
    """Routes + markers only. Leaves Earth, Atmosphere, camera, light, rotation and collections as they are."""
    scn = bpy.context.scene
    root = coll("Earth Scene", scn.collection)
    c_routes = coll("Route Animations", root); c_marks = coll("Location Markers", root)
    ctrl = bpy.data.objects["Earth_Rotation_Controller"]
    for c in (c_routes, c_marks):
        for o in list(c.objects):
            bpy.data.objects.remove(o, do_unlink=True)
    g = route_node_group()
    seg_mat = emission_mat("Route_Segment_Cyan", CYAN, ROUTE_GLOW)
    mark_mat = emission_mat("Marker_Cyan", CYAN, MARKER_GLOW)
    for it in g.interface.items_tree:
        if getattr(it, "name", "") == "Material":
            it.default_value = seg_mat
    t = TIMING
    cycle = round((t["draw"] + t["hold"] + t["fade"] + t["pause"]) * FPS)
    _build_routes(ctrl, c_routes, c_marks, g, seg_mat, mark_mat, cycle)
    return dict(cycle=cycle, routes=len(ROUTES))

def _dot_mesh(mat):
    me = bpy.data.meshes.get("Marker_Dot")
    if me:
        return me
    import bmesh
    me = bpy.data.meshes.new("Marker_Dot")
    bm = bmesh.new()
    bmesh.ops.create_circle(bm, cap_ends=True, radius=0.0075, segments=32)
    bm.to_mesh(me); bm.free()
    me.materials.append(mat)
    return me

def _destination_dot(city, origin, off_s, cycle, ctrl, c_marks, mat, tm=None):
    """Dot at Point B: pops in when the line arrives, gone when the erase ends."""
    lat, lon = CITIES[city]
    m = bpy.data.objects.new(f"Marker_{origin}_to_{city}", _dot_mesh(mat))
    c_marks.objects.link(m)
    m.parent = ctrl
    d = latlon_to_vec(lat, lon)
    m.location = d * (EARTH_RADIUS + SURFACE_OFFSET * 0.6)
    m.rotation_euler = d.to_track_quat("Z", "Y").to_euler()
    m["fade"] = 1.0
    def setter(f):
        _, fa, dot = _route_state(f, off_s, cycle, tm)
        m.scale = (dot, dot, dot); m["fade"] = fa
    def keyer(f):
        m.keyframe_insert("scale", frame=f)
        m.keyframe_insert('["fade"]', frame=f)
    _bake(cycle, setter, keyer)
    _finish_cycles(m)

def _slerp(a, b, f):
    om = a.angle(b)
    return (a * math.sin((1 - f) * om) + b * math.sin(f * om)) / math.sin(om)

def _fcurves(idb):
    act = idb.animation_data.action
    if hasattr(act, "fcurves"):
        return list(act.fcurves)
    out = []   # Blender 4.4+/5.x layered actions
    for layer in act.layers:
        for strip in layer.strips:
            for cb in strip.channelbags:
                out.extend(cb.fcurves)
    return out

def _set_linear_cycle(idb, cycles):
    for fc in _fcurves(idb):
        for k in fc.keyframe_points:
            k.interpolation = "LINEAR"
        if cycles and not any(m.type == "CYCLES" for m in fc.modifiers):
            fc.modifiers.new("CYCLES")

def _smooth(x):
    x = max(0.0, min(1.0, x))
    return x * x * (3 - 2 * x)

def _route_state(f, off_s, cycle, tm=None):
    """Values at frame f: (reveal, fade, dot_scale). Offsets wrap around the loop."""
    t = tm or TIMING
    d, h, fd = t["draw"] * FPS, t["hold"] * FPS, t["fade"] * FPS
    tl = (f - 1 - off_s * FPS) % cycle
    if tl > d + h + fd:
        return 0.0, 1.0, 0.0                       # resting, invisible
    reveal = _smooth(tl / d) if tl < d else 1.0
    fade = 1.0 - _smooth((tl - d - h) / fd) if tl > d + h else 1.0
    dot = _smooth((tl - d) / MARKER_POP_FRAMES) if tl >= d else 0.0
    return reveal, fade, dot

def _bake(cycle, setter, keyer):
    # one linear key per frame over exactly one cycle, then CYCLES modifier
    for f in range(1, cycle + 2):
        setter(f); keyer(f)

def _finish_cycles(idb):
    for fc in _fcurves(idb):
        for k in fc.keyframe_points:
            k.interpolation = "LINEAR"
        if not any(m.type == "CYCLES" for m in fc.modifiers):
            fc.modifiers.new("CYCLES")

def _key_route(ob, mod, ids, off_s, cycle, tm=None):
    inp = mod.properties.inputs           # Blender 5.3 modifier-input API
    sr, se = getattr(inp, ids["Reveal"]), getattr(inp, ids["Erase"])
    se.value = 0.0
    ob["fade"] = 1.0
    def setter(f):
        r, fa, _ = _route_state(f, off_s, cycle, tm)
        sr.value = r; ob["fade"] = fa
    def keyer(f):
        sr.keyframe_insert("value", frame=f)
        ob.keyframe_insert('["fade"]', frame=f)
    _bake(cycle, setter, keyer)
    _finish_cycles(ob)

if __name__ == "__main__":
    print(build())
