import styled from "styled-components";
import Logo from "../../assets/images/logo_new.png";
import { LeftMenuStyle } from "./LeftMenuStyle";
import NestedList from "./NestedList";

const LeftMenu = ({ className, open }: any) => {
  return (
    <div className={`${className} issac-container`}>
      <div className="issac-logo-leftbar">
        {open && <img className="issac-img-leftbar" src={Logo} alt="logo" />}
      </div>
      <NestedList open={open} />
    </div>
  );
};

export default styled(LeftMenu)`
  ${LeftMenuStyle}
`;
