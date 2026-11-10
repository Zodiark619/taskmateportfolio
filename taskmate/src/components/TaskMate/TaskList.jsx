import React from "react";
const TaskList = ({ data, editTaskmate, deleteTaskmate }) => {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="">
          Tasks <span className="badge bg-primary">{data?.length ?? 0}</span>
        </h5>

        {/* <button className="btn btn-outline-danger btn-sm">Delete All</button> */}
      </div>

      {/* Task Items */}

      {data?.map((taskmate) => (
        <div className="card mb-3" key={taskmate.id}>
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title mb-1">{taskmate.name}</h5>
              <p className="card-text text-muted mb-0">
                <small>
                  Created: {new Date(taskmate.created).toLocaleString()}
                </small>
              </p>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => editTaskmate(taskmate)}
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteTaskmate(taskmate)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
