
export default [
  {
    path: '/',
    component: () => import('components/form/App')
    // children: [
    //   { path: '', component: () => import('') }
    // ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
