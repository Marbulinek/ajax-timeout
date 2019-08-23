[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# ajax-timeout
Simple ajax library which will handle ajax call if the internet is slow or data are huge. Just prepare api call, set timeoute value and enjoy :)

## Settings
| Setting       | function        |
| ------------- |:---------------:|
| type          | "POST" or "GET" |
| data          | {} - object containing data to upload to server|
| timeout       | time during which wont be call interrupted |
| logEnabled    | true / false |
| browserTimeout|browser timeout while processing call at backend |
| onSuccess     | callback function |
| onError       | callback function |

## Example
// example of api call with slow Internet 
```javascript
var settings = {
  type: "POST",
  url: 'page.com/myEndPoint4Upload',
  data: { file: hugeData },
  timeout: 120000, // 2 minutes timeout
  onSuccess: function (data) {
    console.log("some success information and do another logic with data returned from server");
  },
  onError: function (data){
    console.log("log the errors");
  }
}
// send prepared ajax call
$.ajaxTimeout(settings);
```