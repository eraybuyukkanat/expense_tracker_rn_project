import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../util/http";
function ManageExpenses({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;



  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const expenseCtx = useContext(ExpensesContext);

  const selectedExpense = expenseCtx.expenses.find((expense)=>expense.id == editedExpenseId);


  function deleteExpenseHandler() {
    navigation.goBack();
    expenseCtx.deleteExpense(editedExpenseId);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if(isEditing){
      expenseCtx.updateExpense(editedExpenseId,expenseData)
    }else{
      storeExpense(expenseData);
      expenseCtx.addExpense(expenseData)
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm submitButtonLabel={isEditing ? "Update" : "Add"} cancelHandler={cancelHandler} onSubmit={confirmHandler} defaultValues={selectedExpense}/>
      
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  
});
