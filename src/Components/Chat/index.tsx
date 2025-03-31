import { useEffect, useState, useCallback } from "react"
import io from "socket.io-client"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Card, CardContent } from "@/Components/ui/card"

type MessageType = {
    text: string
    username?: string
    timestamp: string
}

type SystemMessageType = {
    text: string
    timestamp: string
}

type ChatMessage = {
    type: "message" | "system"
    data: MessageType | SystemMessageType
}

export default function WebSocketChat() {
    const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState<string>("")
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        const ws = io("ws://89.169.168.253:4500", {
            transports: ["websocket", "polling"],
        })

        ws.on("connect", () => {
            console.log("Connected")
            setSocket(ws)
        })

        ws.on("message", (message: MessageType) => {
            setMessages((prev) => [...prev, { type: "message", data: message }])
        })

        ws.on("system", (systemMessage: SystemMessageType) => {
            setMessages((prev) => [...prev, { type: "system", data: systemMessage }])
        })

        ws.on("disconnect", () => {
            console.log("Disconnected")
            setSocket(null)
        })

        return () => {
            ws.disconnect()
        }
    }, [])

    const sendMessage = useCallback(() => {
        if (!socket || !input.trim()) return

        if (input.startsWith("/name")) {
            const parts = input.split(" ")
            if (parts.length < 2) return alert("Введите имя после /name")
            const newUserName = parts[1]
            socket.emit("set_username", { username: newUserName })
            setUsername(newUserName)
        } else {
            if (!username) {
                alert("Введите имя с помощью /name")
                return
            }
            socket.emit("message", { text: input, username })
        }

        setInput("")
    }, [socket, input, username])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendMessage()
    }

    return (
        <div className="flex flex-col items-center p-4 max-w-2xl mx-auto space-y-4">

            <Card className="w-full">

                <CardContent className="space-y-1">
                    <ScrollArea className="h-150 border rounded-md p-2">
                        <div className="space-y-2">
                            {messages.map((msg, index) => (
                                <div key={index} className="text-sm flex flex-col">
                                    {msg.type === "system" ? (
                                        <>
                                            <em className="text-muted-foreground">{msg.data.text}</em>
                                            <small className="text-xs text-muted-foreground">
                                                {new Date(msg.data.timestamp).toLocaleTimeString()}
                                            </small>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <strong>{(msg.data as MessageType).username}:</strong>{" "}
                                                {(msg.data as MessageType).text}
                                            </div>
                                            <small className="text-xs text-muted-foreground">
                                                {new Date(msg.data.timestamp).toLocaleTimeString()}
                                            </small>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                        <Input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={
                                username
                                    ? "Введите сообщение..."
                                    : "Установите имя: /name"
                            }
                            disabled={!socket?.connected}
                        />
                        <Button
                            type="submit"
                            disabled={!socket?.connected || input.trim() === ""}
                        >
                            Отправить
                        </Button>
                    </form>

                    <div className="text-xs text-muted-foreground">
                        Статус: {socket?.connected ? "Подключено" : "Не подключено"}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}