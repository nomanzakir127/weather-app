import { FC } from "react";
import Header from "./Header";
import {Search} from "./Search";

const Layout:FC<any> =({children})=> {
    return (
      <>
        <Header data-testid="header-element"/>
        <Search data-testid="search-element"/>
        {children}
      </>
    );
  }
  
  export default Layout;
  
  