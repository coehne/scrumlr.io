import {AddColumnRequest, Column, EditColumnRequest} from "types/column";

/** This object lists column object specific internal Redux Action types. */
export const ColumnAction = {
  /*
   * ATTENTION:
   * Don't forget the `as` casting for each field, because the type inference
   * won't work otherwise (e.g. in reducers).
   */
  AddColumn: "scrumlr.io/addColumn" as const,
  EditColumn: "scrumlr.io/editColumn" as const,
  DeleteColumn: "scrumlr.io/deleteColumn" as const,
  UpdatedColumns: "scrumlr.io/updatedColumns" as const,
};

/** Factory or creator class of internal Redux column object specific actions. */
export const ColumnActionFactory = {
  /*
   * ATTENTION:
   * Each action creator should be also listed in the type `ColumnReduxAction`, because
   * the type inference won't work otherwise (e.g. in reducers).
   */
  /**
   * Creates an action which should be dispatched when the user wants to add a column to the current board.
   *
   * @param column contains
   *  name: the column name
   *  color: the color of the column
   *  hidden: the flag which indicates whether this column should be visible to all basic users
   */
  addColumn: (column: AddColumnRequest) => ({
    type: ColumnAction.AddColumn,
    column,
  }),
  /**
   * Creates an action which should be dispatched when the user edits a column.
   *
   * @param column contains
   *  columnId: the edited column id
   *  name: the new name
   *  color: the new color of the column
   *  hidden: the new hidden state
   */
  editColumn: (id: string, column: EditColumnRequest) => ({
    type: ColumnAction.EditColumn,
    id,
    column,
  }),
  /**
   * Creates an action which should be dispatched when the user wants to delete a column.
   *
   * @param columnId the column id
   */
  deleteColumn: (columnId: string) => ({
    type: ColumnAction.DeleteColumn,
    columnId,
  }),

  updateColumns: (columns: Column[]) => ({
    type: ColumnAction.UpdatedColumns,
    columns,
  }),
};

export type ColumnReduxAction =
  | ReturnType<typeof ColumnActionFactory.addColumn>
  | ReturnType<typeof ColumnActionFactory.editColumn>
  | ReturnType<typeof ColumnActionFactory.deleteColumn>
  | ReturnType<typeof ColumnActionFactory.updateColumns>;
