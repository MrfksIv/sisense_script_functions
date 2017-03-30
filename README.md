# sisense_script_functions

#### Damesa mboroume na kratoume ta Javascript functions pu xrisimopiume sta scripts twn dashboards/widgets
#### gia na min ta psaxnoume mesa se kathe dashboard.

Arxika tha exume ena .js file me ola ta functions ke an dume oti megalwnei polla mboroume na to spasoume 
se parapanw - p.x. ena me functions pu kamnun apply se pivots, barcharts, i kati etsi.

Enna itan kala na grafoume ke lia comments gia to pws xrisimopias to kathe function (ti kamnei, ti parameters 
thelei, ke ti kamnei return kyriws) 

Aspume:
```
/*
 *	Formats the numeric fields of  user-specified rows to include the '%' sign. The user specifies a column number,
 *	and an array of strings. When a cell of the specified column matches any of the elements of the  specified string
 *	array, all the numeric fields of that row will be modified. 
 *
 * 	Parameters :
 *	
 *	columnToFilter 	: (integer) The 0-indexed number of the column in which to search for the  fields to be changed. - MANDATORY
 *	fieldsToApplyTo	: (string array)  The names of the fields that will be changed to percentage values.  - MANDATORY
 *	times100	: (boolean) If true, all values will be multiplied by 100 before appending the '%' symbol. (default : false)
 *	precision	: (integer) The number of significant figures to round to. (default: 2)
 * 
 *	Returns : VOID
 */
function createPivotPercentFormat(columnToFilter, fieldsToApplyTo, times100=false, precision=2) {
	
	$(`td[fidx=${columnToFilter}]`).each( (index, elem) => {
		val= $(elem).attr('val');
	// 	console.log(val);
		if ( fieldsToApplyTo.indexOf(val) > -1){
			var tr = $(elem).parent('tr');
		//	console.log(tr);
			$(tr).find('.p-value').each( (innerIndex, innerElem) => {
				if (!isNaN($(innerElem).find('div').text())  && $(innerElem).find('div').text() !== '\xa0') {
					times100 ? $(innerElem).find('div').html((parseFloat($(innerElem).find('div').text())*100).toPrecision(precision)+'%') 
						: $(innerElem).find('div').html(parseFloat($(innerElem).find('div').html()).toPrecision(precision)+'%');
					
				}
			})
		}
	})	
}

```
