import { Skeleton } from "@/Components/ui/skeleton";

export default function TableSkeleton () {
    const rows = 10;
    const cols = 7;

    return (
        <div className="rounded-md border p-4 space-y-3">
            {[...Array(rows)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                    {[...Array(cols)].map((_, j) => (
                        <Skeleton key={j} className="h-4 w-24" />
                    ))}
                </div>
            ))}
        </div>
    );
};