export function isVueCpn(vnode) {
    return vnode.tag.startsWith('vue-component')
}