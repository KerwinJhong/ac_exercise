function fizzbuzz(data) {
    let result = ''
    if (data % 3 === 0) {
        result += 'Fizz'
    }
    if (data % 5 === 0) {
        result += 'Buzz'
    }
    if (result === '') {
        result = data
    }
    return result
}