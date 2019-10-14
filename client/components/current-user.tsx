import React from "react";
import { Player } from "@pbn/messages";

interface ICurrentUserProps {
  user?: Player;
}
const CurrentUser: React.FC<ICurrentUserProps> = ({ user }) => {
  if (!user) return null;
  return <div>{user.getName()} ({user.getId()})</div>;
};

export default CurrentUser;
