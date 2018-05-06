import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
fontawesome.config = {
  autoAddCss: false,
}


  
    
    import fortawesomefontawesomefreesolid from '@fortawesome/fontawesome-free-solid'
    fontawesome.library.add(fortawesomefontawesomefreesolid)
    


Vue.component('font-awesome-icon', FontAwesomeIcon)
