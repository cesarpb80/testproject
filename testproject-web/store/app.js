export const getters = {
  getAllLinkMenu: () => {
    return [
      {
        key: 1,
        label: 'menu_1',
        nodes: [
          {
            key: 1,
            label: 'menu_1_1',
            nodes: [],
            url: '/servicio'
          }         
        ]
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
      }       
    ]
  }
}