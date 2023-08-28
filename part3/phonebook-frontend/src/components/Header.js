const Header = ({ title, type }) => {
  return <>{type === 'main' ? <h2>{title}</h2> : <h3>{title}</h3>}</>;
};

export default Header;
