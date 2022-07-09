function findDuplicateTransactions(transactions) {
    const transactionsCopy = transactions.slice().sort((a, b) => {
        return a.id - b.id;
    });
  
    const output = [];
    
    const timeDifference = (time1, time2) => {
         return (new Date(time1).getTime() - new Date(time2).getTime()) / 60000;
    }
  
    while (transactionsCopy.length) {
        const group = [];
        let ref = transactionsCopy.shift();
  
        group.push(ref);
  
        for (let i = 0; i < transactionsCopy.length; i++) {
            if (ref.sourceAccount === transactionsCopy[i].sourceAccount &&
                ref.targetAccount === transactionsCopy[i].targetAccount &&
                ref.amount === transactionsCopy[i].amount &&
                ref.category === transactionsCopy[i].category &&
                timeDifference(transactionsCopy[i].time, ref.time) <= 1) {
  
                    group.push(transactionsCopy[i]);
                    ref = transactionsCopy[i];
                    transactionsCopy.splice(i, 1);
                    i -= 1
                } 
        } 
  
        if (group.length > 1) {
            output.push(group);
        }
    }
    return output;
  }
  
  export default findDuplicateTransactions;
  