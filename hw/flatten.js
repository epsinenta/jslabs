function flatten(arr) {
	let result = [] 
	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			result = result.concat(flatten(arr[i])) 
		} else {
			result.push(arr[i]) 
		}
	}

	return result 
}

const arr = [
	1,
	2,
	[[[[10, 20, 30], 20, 30], 20, 30], 20, 30],
	3,
	[4, [10, 20, 30], 5, 6, [10, 20, 30]],
]
const flattenedArr = flatten(arr)
console.log(flattenedArr) 
