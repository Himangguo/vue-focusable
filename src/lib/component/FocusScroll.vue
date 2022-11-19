<script>
import {focusManageLib, createId, getWidgetRect, refreshLocInfo, isContain} from '../core'
const outerStyle = {
  boxSizing: 'border-box',
  overflow: 'hidden',
  height: '100%',
};

const innerStyle = {
  boxSizing: 'border-box',
  position: 'relative'
};
export default {
  name: "FocusScroll",
  props: {
  },
  data() {
    return {
      disX: 0,
      disY: 0,
      oWrap: null, // 外层element
      dir: '', // 滚动方向
      aChilds: []
    }
  },
  mounted() {
    console.log('FocusScroll mounted')
    let id = createId();
    let oWrapInfo = getWidgetRect(this.oWrap);
    this.oWrapTop = oWrapInfo.top;
    this.oWrapLeft = oWrapInfo.left;
    this.oWrapHeight = oWrapInfo.height;
    this.oWrap.dataset.focusScrollId = id;
    focusManageLib.widgets[id] = this._self;
    this.dir = this.oWrap.dataset.dir;
    // 手动给oInner添加作用域属性，不然取不到在oInner上设置的局部class样式
    this.oInner.setAttribute(this.oWrap.attributes[0].name, "")
    // 滚动组件下所有focus实例
    this.aChilds = this.oInner.querySelectorAll('[data-focus-id]');
    this.calcFocusable()
  },
  updated() {
    console.log('update scroll cpn')
    if(this.aChilds.length === 0) {
      this.aChilds = this.oInner.querySelectorAll('[data-focus-id]');
    }
    this.calcFocusable()
  },
  render(createElement) {
    const child = this.$slots.default[0]
    const childVNode = createElement(child.tag, {
      ref: (oInner)=>{
        this.oInner = oInner;
      },
      staticStyle: {
        ...innerStyle,
        ...child.data?.staticStyle,
      },
      staticClass: child.data?.staticClass
    }, child.children)
    return createElement('div',
        {
          ref: (oWrap)=>{
            this.oWrap = oWrap;
          },
          attrs: this.$attrs,
          staticStyle: {
            ...outerStyle,
            ...this.$vnode.data?.staticStyle,
          }
        },
        [childVNode])
  },
  methods:  {
    calcFocusable() {
      this.aChilds.forEach(el=>{
        const id = el.getAttribute("data-focus-id");
        const zIndex = el.getAttribute("data-focus-index");
        const isShow =  isContain(el);
        if(!isShow) {
          el.setAttribute('not-allow-focus', '')
        }else {
          el.removeAttribute('not-allow-focus')
        }
      })
    },
    action(e) {
      let nowTarget = e.element;
      // 当前滚动组件的宽高
      let oWrapHeight = this.oWrap.offsetHeight;
      let oWrapWidth = this.oWrap.offsetWidth;
      // 滚动范围内的中心位置宽高
      let centerWrapHeight = oWrapHeight / 2;
      let centerWrapWidth = oWrapWidth / 2;
      // 新focus元素距离父元素边框的top和left距离
      let nowFocusTop = nowTarget.offsetTop;
      let nowFocusLeft = nowTarget.offsetLeft;
      // 新focus元素的margin样式值
      let marginTop = parseInt(getComputedStyle(nowTarget, null).marginTop, 10);
      let marginBottom = parseInt(getComputedStyle(nowTarget, null).marginBottom, 10);
      let marginLeft = parseInt(getComputedStyle(nowTarget, null).marginLeft, 10);
      let marginRight = parseInt(getComputedStyle(nowTarget, null).marginRight, 10);
      // 新focus元素离中间位置的距离
      let expectedLocTop = centerWrapHeight - nowFocusTop - marginTop - marginBottom;
      let expectedLocLeft = centerWrapWidth - nowFocusLeft - marginLeft - marginRight;
      // 滚动区域的
      let maxTop = this.oInner.scrollHeight;
      let maxLeft = this.oInner.scrollWidth;
      if (expectedLocTop < 0) {
        if (oWrapHeight - expectedLocTop >= maxTop) {
          this.disY = oWrapHeight - maxTop;
        } else {
          this.disY = expectedLocTop;
        }
      } else {
        this.disY = 0;
      }
      if (expectedLocLeft < 0) {
        if (oWrapWidth - expectedLocLeft >= maxLeft) {
          this.disX = oWrapWidth - maxLeft;
        } else {
          this.disX = expectedLocLeft;
        }
      } else {
        this.disX = 0;
      }
      if (this.dir === 'h') {
        this.disY = 0;
      } else if (this.dir === 'v') {
        this.disX = 0;
      }
      this.oInner.style.transform = `translate(${this.disX}px, ${this.disY}px)`;
      refreshLocInfo(this.aChilds);
    }
  }
}
</script>
