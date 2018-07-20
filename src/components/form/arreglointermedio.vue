<template>
  <div>
    <form v-if=" multiple" >
       <ul v-for="(tipos, index) in TiposCompletos" :key="index">
         <div class="row">
        <div class="col-8">
          <q-checkbox id="info" v-bind:value="tipos.data" v-model="tipos.checked"/>
              <label for="tipos.data"> {{tipos.data}} </label>
        </div>
            <div class="col-4">  
              
                <q-input v-if='tipos.checked' type="number" prefix="Cubre $" class="form-control" value="" v-model='tipos.dato'/>
              
            </div>  
          </div>
       </ul>
    </form>

    <template v-else >
       <ul v-for="(tipos, index) in TiposCompletos" :key="index">
           <q-radio v-bind:val="tipos.data" v-model="tiporadio" /> 
              <label for="tipos.data"> {{tipos.data}} </label>
              <div v-if='tiporadio === tipos.data'>
                <q-input type="number" prefix="Cubre $" class="form-control" value="" v-model='tipos.dato'/>
              </div>
              

       </ul>
    </template>

  </div>
</template>

<script>
export default {
  props: [
    'TiposCobertura',
    'multiple'
  ],
  data () {
    return {
      TiposCompletos: [
      ],
      tiporadio: null
    }
  },
  methods: {
    agregar () {
      this.TiposCobertura.forEach(element => {
        this.TiposCompletos.push({
          data: element.texto,
          valor: element.valor,
          dato: '',
          checked: false
        })
      })
    },
    agregarFinal () {
      var TiposFinales = []
      if (this.multiple) {
        this.TiposCompletos.forEach(element => {
          if (element.checked === true && element.dato > 0 && element.dato != null) {
            TiposFinales.push({
              valor: element.valor,
              dato: element.dato
            })
          }
        })
      } else {
        this.TiposCompletos.forEach(element => {
          if (element.checked != null && element.dato > 0 && element.dato != null) {
            if (this.tiporadio === element.data) {
              TiposFinales.push({
                valor: element.valor,
                dato: element.dato
              })
            }
          }
        })
      }
      return TiposFinales
    }
  },
  mounted () {
    this.agregar()
  },
  watch: {
    TiposCompletos: {
      handler: function (newValue) {
        this.$emit('changed', this.agregarFinal())
      },
      deep: true
    }
  }

}
</script>
