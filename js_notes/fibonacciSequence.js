function fibonacciSequence(sequenceLength) {
    var sequence = [];
    for (let i = 0; i <= sequenceLength; i++) {
        if (sequence.length === 0) {
            sequence.push(i);
        } else if (sequence.length === 1) {
            sequence.push(i);
        } else {
            index1 = sequence.length - 1;
            index2 = sequence.length - 2;
            sequence.push(sequence[index1] + sequence[index2]);
        }
    }
    return sequence;
}

console.log(fibonacciSequence(17))