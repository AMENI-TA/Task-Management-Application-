
const TaskFilters = ({ onFilterChange, onSortChange }) => {
    return (
      <div>
        <select onChange={(e) => onFilterChange(e.target.value)}>
          <option value="">Tous</option>
          <option value="pending">En attente</option>
          <option value="completed">Terminée</option>
        </select>
        <select onChange={(e) => onSortChange(e.target.value)}>
          <option value="">Sans tri</option>
          <option value="deadline">Par date limite</option>
          <option value="priority">Par priorité</option>
        </select>
      </div>
    );
  };
  
  export default TaskFilters;
  