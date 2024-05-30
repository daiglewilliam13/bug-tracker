
export function BugCard({bug}:any) {
        return (
            <div >
        <ul className="bug-card">
            <li>Created: {bug.created}</li>
            <li>Id: {bug._id}</li>
            <li>Status: {bug.status}</li>
            <li>Description: {bug.description}</li>
            <li>Assigned To: {bug.assignedTo}</li>
            <li>Comments: {bug.comments}</li>
            <li>Pull Req Number: #{bug.pullReqNum}</li>
            <li>Resolved: {bug.resolvedDate}</li>
            <li>Created By: {bug.createdBy}</li>
        </ul>
        </div>
    );
}
