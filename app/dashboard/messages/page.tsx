"use server"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Badge} from "@/components/ui/badge"
import {getMessages} from "@/lib/data";
import {Message} from "@/types";

const generateBackgroundColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`; // Pastel colors
};

export default async function Messages() {
    const messages: Message[] = await getMessages();

    return <main className="flex justify-center">
            <Accordion type="single" collapsible className="w-full max-w-4xl p-4 space-y-4">
                {
                    messages.map((message, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger messageId={message.id} read={message.read} userId={message.userId} className={`grid grid-cols-[auto,1fr,auto] gap-6 ${!message.read && "bg-[#f0f9ff]"} rounded-2xl px-6`}>
                              <div className="w-[60px] h-[60px] rounded-full grid place-content-center text-xl font-bold" style={{backgroundColor: generateBackgroundColor(message.firstName)}}>{message.firstName.charAt(0)}</div>
                                <div className="text-left">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">{message.firstName} {message.lastName} &lt;{message.email}&gt; </h3>
                                        <p className="text-sm text-gray-500">{new Date(message.sentAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p>{message.title}</p>
                                        {!message.read && <Badge>unread</Badge>}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className={`ml-[110px] py-4 ${!message.read ? "py-4" : "py-0"}`}>
                                {message.message}
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>
    </main>
}