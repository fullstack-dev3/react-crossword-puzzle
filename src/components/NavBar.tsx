import images from '../helpers/images';

const NavBar = () => {
  return (
    <div className="nav">
      <div className="container">
        <img
          className="left"
          alt=""
          src={images.leftKid}
        />
        <a href="/">
          <img
            alt="Crosswords For Kids"
            title="Crosswords For Kids"
            src={images.logo}
            style={{ maxWidth: '430px' }}
          />
        </a>
        <img
          className="right"
          alt=""
          src={images.rightKid}
        />
      </div>
    </div>
  );
}

<style>

</style>

export default NavBar;