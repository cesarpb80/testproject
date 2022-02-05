export const getters = {
  getAllLinkMenu: () => {
    return [
      {
        key: 1,
        label: 'menu_1',
        url: '/servicio',
        nodes:[]
      },   
      {
        key: 2,
        label: 'menu_2',     
        nodes: [
          {
            key: 1,
            label: 'menu_2_1',
            nodes: [],
            url: "/cliente"
          }
        ]
      },
      {
        key: 3,
        label: 'menu_3',     
        nodes: [
          {
            key: 1,
            label: 'menu_3_1',
            nodes: [],
            url: "/producto"
          }
        ]
      }       
    ]
  }
}