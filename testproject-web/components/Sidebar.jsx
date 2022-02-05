import React, { useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { getters } from '../store/app';
import TreeMenu from 'react-simple-tree-menu';
import '../node_modules/react-simple-tree-menu/dist/main.css';
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation';

function hasChildren(data,t) {
  data.forEach(item => {
    item.label=t(item.label)
    if(item.nodes.length > 0){
    hasChildren(item.nodes,t)
    }
  })
 
 return data;
}

const Sidebar = () => {
  const { t } = useTranslation("common");
  const getAllMapsViews = getters.getAllLinkMenu();
  const router = useRouter();

  useEffect(() => {
    
  }, []);
  
  return (
    <Menu>
      <TreeMenu data={hasChildren(getAllMapsViews,t)} 
        onClickItem={({ key,  label, ...props }) => {         
          if(props.url){            
            router.push(props.url);
          }
        }} />
    </Menu>);
}

export default Sidebar;