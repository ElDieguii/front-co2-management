import LeftBarNewUI from './LeftBarNewUI';
import HeaderNewUI from './HeaderNewUI';

const NavBarNewUI = ({ children }: any) => {
  return (
    <div className="flex min-h-screen w-full">
      <LeftBarNewUI />
      <div className="flex-grow flex flex-col">
        <HeaderNewUI children={children} />
      </div>
    </div>
  );
};

export default NavBarNewUI;
