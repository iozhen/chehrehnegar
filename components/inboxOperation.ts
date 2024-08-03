import data from "@/data/support.json";

export interface initialDataProps {
   avatar: string;
   chatId: number;
   close: boolean;
   company: string;
   created: string;
   date: string;
   getTime: number;
   id: string;
   messageIco: string;
   open: boolean;
   respond: string;
   sender: string;
   title: string;
   ago: string;
   overdue: string;
}

const { inboxItems } = data;

// sort order
export const sortedFunc = (values: string) => {
   const addedGetTime = inboxItems.map((item) => ({
      ...item,
      getTime: new Date(item.date).getTime(),
   }));

   return values === "Newest"
      ? addedGetTime.sort((a, b) => b.getTime - a.getTime)
      : addedGetTime.sort((a, b) => a.getTime - b.getTime);
};

// display order
export const displayStatus = (
   initialData: initialDataProps[],
   values: string
) =>
   values === "open"
      ? initialData.filter(({ open }) => open)
      : initialData.filter(({ close }) => close);
