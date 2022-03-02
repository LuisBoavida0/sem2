export function splitName(word) {
    const separatedWord = word.split(' ')
    return {
        first: separatedWord[0],
        last: separatedWord[1]
    }
}