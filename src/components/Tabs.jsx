import React from 'react';

const Tabs = ({ setFilter, filter }) => {
  return (
    <div className="container d-flex justify-content-center mt-4 mb-3">
      <div
        className={`tabsbutton ${filter === 'all' ? 'activebtn' : ''}`}
        onClick={() => setFilter('all')}
      >
        All Tasks
      </div>
      <div
        className={`tabsbutton ${filter === 'completed' ? 'activebtn' : ''}`}
        onClick={() => setFilter('completed')}
      >
        Completed Tasks
      </div>
      <div
        className={`tabsbutton ${filter === 'uncompleted' ? 'activebtn' : ''}`}
        onClick={() => setFilter('uncompleted')}
      >
        Uncompleted Tasks
      </div>
    </div>
  );
};

export default Tabs;
