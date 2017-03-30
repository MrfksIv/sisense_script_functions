
/***************************** FUNCTION LIST ******************************* /
 *	1.	createPivotPercentFormat :
 *			Formats specif numeric values of a pivot as percentage (adds '%')
 *
 *	2.	formatPivotNegRed:
 *			Changes the character color of negative pivot values to red.
 *
 *	3.	formatIndSecNegRed:
 *			Changes the character color of all negative secondary indicators to red.
 ****************************************************************************/



/*
 *	Formats the numeric fields of  user-specified rows to include the '%' sign. The user specifies a column number,
 *	and an array of strings. When a cell of the specified column matches any of the elements of the  specified string
 *	array, all the numeric fields of that row will be modified.
 *
 * 	Parameters :
 *
 *	columnToFilter 		: (integer) The 0-indexed number of the column in which to search for the  fields to be changed. - MANDATORY
 *	fieldsToApplyTo		: (string array)  The names of the fields that will be changed to percentage values.  - MANDATORY
 *	times100				: (boolean) If true, all values will be multiplied by 100 before appending the '%' symbol.		(default : false)
 *	precision				: (integer) The number of significant figures to round to.		(default: 2)
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

/*
 *	Makes the character color of all negative values of a pivot red.
 *	This should be included in the widget's script.
 *
 *	Parameters: NONE
 *
 *	Returns VOID
 */
function formatPivotNegRed() {
	var t = $('.p-value', 'widget[type=pivot]');
	t.each( function(index, elem){
		var val = $(elem).html().replace(/%/g,'');
		if ( !isNaN(val) ){
			if(parseFloat(val) < 0){
				//console.log(val);
				$(elem).css('color','red');
			}
		}
	});

/*
 *	Makes the character color of all negative secondary indicators in a
 *	a dashboard red.
 *	This should be included in the dashboard's script.
 *
 *	Parameters: NONE
 *
 *	Returns VOID
 */
function formatIndSecNegRed() {
	var indicatorVal = $('indicator-secondary').find('.secondary_span').html().replace(/%/g,'');
	//console.log(indicatorVal);
	if ( !isNaN(indicatorVal) ){
		if(parseFloat(indicatorVal) < 0){
				//console.log(indicatorVal);
				$('indicator-secondary').find('.secondary_span').css('color','red');
		}
	}
}


}
