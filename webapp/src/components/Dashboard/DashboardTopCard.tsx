import DefaultCard from "./../Common/DefaultCard";

//Icons
import { FaClipboardList } from "react-icons/fa";
import { MdOutlineMoneyOff } from "react-icons/md";
import { BsCalendarPlus, BsCalendarCheck } from "react-icons/bs";

type DashboardTopCardProps = {
  icon: 1 | 2 | 3 | 4;
  title: string;
  value: string;
};

const icon_style = {
  width: "20%",
};

const ICON_TYPE = {
  //Total clients in debt
  1: <FaClipboardList size={30} color={"#526D82"} style={icon_style} />,

  //Purchases created this month
  2: <BsCalendarPlus size={30} color={"#526D82"} style={icon_style} />,

  //Purchases paid this month
  3: <BsCalendarCheck size={30} color={"#526D82"} style={icon_style} />,

  //Total past dues
  4: <MdOutlineMoneyOff size={30} color={"#526D82"} style={icon_style} />,
};

const DashboardTopCard = ({ icon, title, value }: DashboardTopCardProps) => {
  return (
    <DefaultCard>
      <div className="d-flex justify-content-center">
        {ICON_TYPE[icon]}
        <span className="fs-6 text-center" style={{ width: "80%" }}>
          {title}:
        </span>
      </div>

      <div className="d-flex justify-content-center">
        <span className="fs-1 mx-2" style={{ color: "#526D82" }}>
          {value}
        </span>
      </div>
    </DefaultCard>
  );
};

export default DashboardTopCard;
