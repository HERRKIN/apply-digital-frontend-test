import { Loader2 } from "lucide-react"

const Loader = () => {
    return (
        <div className="flex justify-center items-center py-16">
            <Loader2 className="w-10 h-10 animate-spin" data-testid="loader" />
        </div>
    )
}

export { Loader }