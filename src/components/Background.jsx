const Background = ({ showNav }) => {
    return <>{showNav && <div className="backdrop"></div>}</>;
  };
  
  export default Background;