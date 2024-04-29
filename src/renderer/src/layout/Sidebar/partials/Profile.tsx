// import { Avatar } from "antd";

interface Props {
  className?: string;
}
function Profile(props: Props): JSX.Element {
  // const name = "Fanes Pratama";

  return (
    <div className={props.className + " px-3 mt-3"}>
      {/* <Avatar size={30}>{name[0]}</Avatar> */}
      <div></div>
    </div>
  );
}

export default Profile;
