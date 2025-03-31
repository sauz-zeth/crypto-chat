import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import Chat from "@/Components/Chat"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/Components/ui/sheet"

export default function Header() {
    return (
        <header className={cn("fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm")}>
            <div className="max-w-screen-xl mx-auto px-4 py-1 flex items-center justify-between">
                <h1 className="text-xl font-semibold">CryptoChat</h1>
                <nav>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="cursor-pointer">Чат</Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Чат</SheetTitle>
                            </SheetHeader>
                            <Chat/>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </header>
    )
}