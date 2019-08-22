[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# ajax-timeout
Simple ajax library which will handle connection during upload/download bytes if neccessary

## Demo
// prepare huge ajax call
```
var settings = {
  type: "POST",
  url: 'page.com/myEndPoint4Upload',
  data: { file: hugeData },
  timeout: 120000, // 2 minuty timeout
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
