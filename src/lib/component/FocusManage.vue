<script>
import { focusManageLib } from '../core'
export default {
    provide: {
        focusInfo: focusManageLib
    },
    mounted() {
      console.log(this.$slots.default[0]);
    },
    render(){
      return this.$slots.default
    }
}
</script>
