import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const ChatList = () => {
    return (
        <Table>
            <TableCaption>A list of recent chats.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Chats</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>chat1</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};