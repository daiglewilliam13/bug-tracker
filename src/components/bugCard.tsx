export function BugCard({ bug }: any) {
    return (
        <ul className="bug-card">
            <li>{bug.created}</li>
            <li>{bug.id}</li>
            <li>{bug.status}</li>
            <li>{bug.description}</li>
            <li>{bug.assignedTo}</li>
            <li>{bug.comments}</li>
            <li>{bug.pullReqNum}</li>
            <li>{bug.resolvedBy}</li>
            <li>{bug.resolvedDate}</li>
            <li>{bug.createdBy}</li>
        </ul>
    );
}