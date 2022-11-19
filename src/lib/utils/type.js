export function isVueCpn(vnode) {
    if(!vnode.tag) return false
    return vnode.tag.startsWith('vue-component')
}
