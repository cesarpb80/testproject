const utilities = {   
    deleteConfirm: async(t) => {
        try {

            let result = await swal({
                title: t('common:alertConfirmTitle'),
                text: t('common:alertConfirmText'),
                icon: 'warning',
                buttons: true,
                dangerMode: true
            });
            return result;
        } catch (e) {
            console.error(e);
        }

    },
    filterItems:  async (arr, criteria) => {
      return arr.filter(item => {
        return criteria.every(i => {
            return i.Values.indexOf(item[i.Field]) > -1;
        });
      });
    },
    range: async(start, end, step) => {
        var range = [];
        var typeofStart = typeof start;
        var typeofEnd = typeof end;
    
        if (step === 0) {
            throw TypeError("Step cannot be zero.");
        }
    
        if (typeofStart == "undefined" || typeofEnd == "undefined") {
            throw TypeError("Must pass start and end arguments.");
        } else if (typeofStart != typeofEnd) {
            throw TypeError("Start and end arguments must be of same type.");
        }
    
        typeof step == "undefined" && (step = 1);
    
        if (end < start) {
            step = -step;
        }
    
        if (typeofStart == "number") {
    
            while (step > 0 ? end >= start : end <= start) {
                range.push(start);
                start += step;
            }
    
        } else if (typeofStart == "string") {
    
            if (start.length != 1 || end.length != 1) {
                throw TypeError("Only strings with one character are supported.");
            }
    
            start = start.charCodeAt(0);
            end = end.charCodeAt(0);
    
            while (step > 0 ? end >= start : end <= start) {
                range.push(String.fromCharCode(start));
                start += step;
            }
    
        } else {
            throw TypeError("Only string and number types are supported");
        }
    
        return range;
    },
    filterArray: async (arr1, arr2) => {
        let res = [];
        res = arr1.filter(el => {
            debugger
            return !arr2.find(element => {
                return element.id === el.id;
            });
        });
        return res;
    }
}

export default utilities;