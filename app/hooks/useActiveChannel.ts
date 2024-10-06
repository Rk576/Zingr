import { Channel, Members } from "pusher-js";
import useActiveList from "./useActiveList";
import { useEffect, useState } from "react";
import { pusherClient } from "../libs/pusher";

// Define the structure for the member
interface Member {
  id: string;  // or any other relevant member properties
}

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe('presence-messenger');
      setActiveChannel(channel);
    }

    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMembers: string[] = [];

      // Define the member type properly
      members.each((member: Member) => initialMembers.push(member.id));
      set(initialMembers);
    });

    channel.bind("pusher:member_added", (member: Member) => {
      add(member.id);
    });

    channel.bind("pusher:member_removed", (member: Member) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe('presence-messenger');
        setActiveChannel(null);
      }
    }
  }, [activeChannel, set, add, remove]);
};

export default useActiveChannel;
