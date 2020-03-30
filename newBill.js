function noenter() {
    return !(window.event && window.event.keyCode == 13);
  }

// Add New Item
document.querySelector('#addItem').addEventListener('click', (e) => {
    console.log('addnewitem');

    var div_item = document.querySelector('.itemInput_div')
    var item = document.querySelector('.item')
    var newitem = item.cloneNode(true);

    newitem.querySelector(".ival").onkeydown = function(e){
        if (e.which == 13) //13 is the keycode referring to enter.
            {
               e.preventDefault(); //this will prevent the intended purpose of the event. 
            //    return false; //return false on the event.
            }
        }

    newitem.querySelector('.del_item').addEventListener('click', (e) => {
        var butt = e.srcElement
        var div = butt.parentElement
        
        if (document.querySelector('.itemInput_div').children.length ==1){
            console.log('only item');
        }
        else{
        console.log(div)
        div.remove();}
        e.preventDefault()
    })

    newitem.querySelector('.item_names').addEventListener('change', (e)=>{
        // no other item of the same category exists: leave empty
        var its = document.querySelectorAll('.item_names');
        if(its.length==1){
            return;
        }
        for(i=0;i<its.length; i++){
            if(its[i]==e.srcElement){
                continue;
            }
            if(its[i].value==e.srcElement.value){
              e.srcElement.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.value  =   its[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.value 
              break;
            }
        }
        //same type item exists: rate copy 
    });

    newitem.querySelector('.item_rates').addEventListener('change', (e)=>{
        var itms = document.querySelectorAll('.item_names');
        var newrate = e.srcElement.value;
        var itm_name = e.srcElement.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.value;
    
        for(i=0; i<itms.length;i++){
            if(itms[i].value==itm_name){
                itms[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.value  =   itms[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.value = newrate
            }
        }
    })

    newitem.children[6].value='';
    newitem.children[8].value='';
    newitem.children[9].value='';
    newitem.children[4].value='';
    newitem.children[2].value='';
    newitem.children[0].value='';

    div_item.appendChild(newitem);
    e.preventDefault()
})
document.querySelector(".ival").onkeydown = function(e){
    if (e.which == 13) //13 is the keycode referring to enter.
        {
           e.preventDefault(); //this will prevent the intended purpose of the event. 
        //    return false; //return false on the event.
        }
    }
// Delete Corresponding Item
document.querySelector('.del_item').addEventListener('click', (e) => {


    e.preventDefault()
    var butt = e.srcElement
    var div = butt.parentElement
    
    if (document.querySelector('.itemInput_div').children.length ==1){
        console.log('only item');
    }
    
    else{
    
    console.log(div)
    div.remove();}
    
})

//calculate amount
document.querySelector('#calculate').addEventListener('click', (e)=>{
    e.preventDefault();
    var amount = calculateAmount();
    document.querySelector('#amount').setAttribute('editable', 'True');
    var client_name = document.querySelector('#client').value.toString();

    var comm5 = 'SELECT * FROM CLIENTS WHERE Name="'+client_name+'";';
    var db = openDatabase('WOODYFAMRS', '1.0', 'WF DATABASE', 20000 * 1024 * 1024);


    db.transaction(function (tx){

        tx.executeSql(comm5, [], function(tx, results){
            console.log('done')
            if(results.rows.length==0){
                window.alert('Please select the client name first!')
            }
            else{
            var client_details = results.rows.item(0);
   
            if(client_details['State']=='Haryana'){
               document.querySelector('#amount').value= 'Amount: \t '+ (amount).toString()+'\t \nSGST (9%):\t'+((0.09*amount).toFixed(2)).toString()  + '\nGrand Total: \t'+((1.18*amount).toFixed(0)).toString() ;
           }
       
           else{
               document.querySelector('#amount').value= 'Amount: \t '+ (amount).toString()+ '\nIGST (18%): \t'+((0.18*amount).toFixed(2)).toString() + '\nGrand Total:\t'+((1.18*amount).toFixed(0)).toString() ;
           } }
        }, function(tx, e){
            console.log('Err', e);
            
        })
    
    })

});
    

function validateBillForm(){

    var bool_client = (document.querySelector("#client").value!="") 
    var bool_vehicle = (document.querySelector('#vehicleno').value!="")
    var bool_grno = (document.querySelector('#grno').value!="")

    var bool_item=true;
    var item_vals = document.querySelectorAll('.ival');
    for(i=0; i<item_vals.length; i++){
        if(item_vals[i].value==""){
            bool_item=false;
        }
    }
    console.log(bool_client, bool_vehicle, bool_grno, bool_item)
    return bool_client*bool_vehicle*bool_grno*bool_item;
}
    



//submit and print bill
document.querySelector('#submit').addEventListener('click', (e) => {

    var billnum = document.querySelector('#billNumber').value.toString();

    var date_val =  document.querySelector('#date').value.toString();
    var month_val = (parseInt(document.querySelector('#month').value)+1)
    if(month_val<10){
        month_val='0'+month_val.toString();
    }
    else{
        month_val=month_val.toString()
    }
    var yr_val = document.querySelector('#year').value.toString();
    var final_date = yr_val+'-'+month_val+'-'+date_val;

    var print_date = date_val+'-'+month_val+'-'+yr_val;

    var hrs_val = document.querySelector('#hours').value.toString();
    var min_val = document.querySelector('#miniute').value.toString();
    var ampm_val = document.querySelector('#ampm').value.toString();
    var final_time = hrs_val+':'+min_val+' '+ampm_val;

    var client_name = document.querySelector('#client').value.toString();

    var vehicleno = document.querySelector('#vehicleno').value.toString();
    var grno = document.querySelector('#grno').value.toString();

    var items='';
    var item_divs =  document.querySelector('.itemInput_div').children;
    items+=item_divs.length.toString()+'_/_'
    for(i=0; i<item_divs.length; i++){
        idiv = item_divs[i];
        var phsn = idiv.children[0].value.toString();
        var pname = idiv.children[2].value.toString();
        var plen = idiv.children[4].value.toString();
        var pwid = idiv.children[6].value.toString();
        var pqty = idiv.children[8].value.toString();
        var prate = idiv.children[9].value.toString();

        items+=phsn+' : '+pname+' : '+plen+' : '+pwid+' : '+pqty+' : '+prate+' : '+'_/_';
    }

    var amnt = calculateAmount();
    amnt=(1.18*amnt).toFixed(0);
    console.log(billnum, final_date, final_time, client_name, vehicleno, grno, items, amnt);



    //VALIDATE FORM


    var isValid = validateBillForm();


    if(isValid){
    // store in database
        var comm_test = 'SELECT * FROM TRANSACTIONS WHERE BillNum="'+billnum+'";'
        var db = openDatabase('WOODYFAMRS', '1.0', 'WF DATABASE', 20000 * 1024 * 1024)

        db.transaction(function (tx) {
            tx.executeSql(comm_test, [], function (tx, results) {
             console.log('done')
             var num_items = results.rows.length;
             console.log(num_items);
             if (num_items==0){
                 console.log('fresh');
                 var commd2 = 'INSERT INTO TRANSACTIONS VALUES ("'+billnum+'","'+client_name+'","'+final_date+'","'+final_time+'","'+vehicleno+'","'+grno+'","'+items+'",'+amnt.toString()+');'
                console.log(commd2);
             }
             else{
                 console.log('update');
                 var commd2 = 'UPDATE TRANSACTIONS SET ClientName="'+client_name+'", Date="'+final_date+'", Time="'+final_time+'", VehicleNo="'+vehicleno+'", GRNo="'+grno+'", Items="'+items+'", Amount='+amnt.toString()+' WHERE BillNum="'+billnum+'";'
                 console.log(commd2);
             }
             var db = openDatabase('WOODYFAMRS', '1.0', 'WF DATABASE', 20000 * 1024 * 1024)
             db.transaction(function (tx) {
                 tx.executeSql(commd2, [], function (tx, results) {
                     console.log('done')
                 }, function(tx, e){console.log('Error!', e.message)
                 })
                 });

             
            }, function(tx, e){console.log('Error!', e.message)
          })
          });
    
    
    e.preventDefault();


    //increment bill number counter in database
    var comm3 = 'UPDATE BILLNUM SET num='+parseInt(billnum)+' WHERE num='+parseInt(billnum-1)+';';
    var db = openDatabase('WOODYFAMRS', '1.0', 'WF DATABASE', 20000 * 1024 * 1024)
    db.transaction(function (tx) {
        tx.executeSql(comm3, [], function (tx, results) {
         console.log('done')
        }, function(tx, e){console.log('Error!', e.message)
      })
      });


      var state_codes={
    'JAMMU AND KASHMIR': 1,
    'HIMACHAL PRADESH':	2,
	'PUNJAB':	3,
	'CHANDIGARH':	4,
	'UTTARAKHAND':	5,
	'HARYANA':	6,
	'DELHI':	7,
	'RAJASTHAN':	8,
    'UTTAR PRADESH':	9,
	'BIHAR':	10,
	'SIKKIM':	11,
	'ARUNACHAL PRADESH':	12,
	'NAGALAND':	13,
	'MANIPUR':	14,
	'MIZORAM':	15 ,
	'TRIPURA':	16,
	'MEGHLAYA':	17,
	'ASSAM':	18,
	'WEST BENGAL':	19,
	'JHARKHAND':	20,
	'ODISHA':	21,
	'CHATTISGARH':	22,
	'MADHYA PRADESH':	23,
	'GUJARAT':	24,
	'DAMAN AND DIU':	25,
	'DADRA AND NAGAR HAVELI':	26,
	'MAHARASHTRA':	27,
	'ANDHRA PRADESH(BEFORE DIVISION)':	28,
	'KARNATAKA':	29,
	'GOA':	30,
	'LAKSHWADEEP':	31,
	'KERALA':	32,
	'TAMIL NADU':	33,
	'PUDUCHERRY':	34,
    'ANDAMAN AND NICOBAR ISLANDS':	35,
	'TELANGANA':	36,
	'ANDHRA PRADESH (NEW)':	37
      }

      //PRINT

    var comm5 = 'SELECT * FROM CLIENTS WHERE Name="'+client_name+'";'
    var db = openDatabase('WOODYFAMRS', '1.0', 'WF DATABASE', 20000 * 1024 * 1024)
    db.transaction(function (tx) {
        tx.executeSql(comm5, [], function (tx, results) {
         console.log('done')

         
        var p1 = document.querySelector('#printView');
        var p2 = document.querySelector('#printView1');
        var p3 = document.querySelector('#printView2');

        var pvs = [p1, p2, p3];

        for(tpvs = 0; tpvs<pvs.length; tpvs++){
        
        var client_details = results.rows.item(0);
        var print_div =  pvs[tpvs] //document.querySelector('#printView');
        print_div.innerHTML=''
        
        if(tpvs>=1){
        	print_div.appendChild(document.createElement('br'));
        }

         var gst_ph = document.createElement('div');


         var copyname = '';
         if(tpvs==0){
             copyname='Original Copy'
         }
         else if(tpvs==1){
             copyname='Duplicate Copy'
         }

         else if(tpvs==2){
             copyname='Office Copy'
         }

        gst_ph.innerHTML = '<span class="gstin"><b>GSTIN: 06AANPL6719Q2ZV</b></span> <span class="phnum"><i>'+copyname +'</i> </span> <br> ';
        print_div.appendChild(gst_ph);


         var heading = document.createElement('span');
         heading.innerHTML = 'WOODY FARMS';
         heading.classList.add('title');
         print_div.appendChild(heading)
     
         var subheading = document.createElement('span');
         subheading.innerHTML = '(A Timber Industry) <br> Manufacturer and Supplier of all kinds of Timber & Plywood';
         subheading.classList.add('subtitle');
         print_div.appendChild(subheading)
     
         var infohead = document.createElement('div')
         var curr_state_code = state_codes[client_details['State'].toUpperCase()];
        if(curr_state_code<10){
            curr_state_code='0'+curr_state_code.toString();
        }
        else{
            curr_state_code=curr_state_code.toString()
        }
         var ihtml = '<span class="subtitle" style="margin-top:1.5%;"> <b> Tax Invoice </b> </span>'
         ihtml=ihtml+'<br> <span class="bill_add"><b>Invoice No.: </b> <span class="entry" style="font-size:1.3em;">'+billnum+'</span><br> <b>Billing Address: </b><span class="entry" style="font-size:1.2em; font-weight:bold;">'+client_name+'</span> <br><span class="entry">'+client_details['Address']+'</span> <br> <b>State: </b> <span class="entry">'+client_details['State']+'</span> &nbsp <b>State Code: </b> <span class="entry">' + curr_state_code+ '</span> <br><b> GSTIN:</b> <sapn class="entry"> '+client_details['GSTIN']+'</span></span>'
         ihtml=ihtml+'<span class="date_time"> <b>Date:</b> <span class="entry">'+print_date+'</span><br> <b>Time: </b><span class="entry">'+final_time+'</span><br> <b>Vehicle No.: </b> <span class="entry">'+vehicleno+'</span><br> <b>GRNo.: </b><span class="entry">'+grno+'</span></span>'
         infohead.innerHTML = ihtml; 
         print_div.appendChild(infohead)


         var item_set = items.split('_/_')
         console.log(item_set)
         var num_items = parseInt(item_set[0]);
         item_set=item_set.splice(1)
         var itme_hsns = []
         var item_names = []
         var item_qtys = [] 
         var item_rates = []
         var item_len = []
         var item_wid = []
 
         for(i=0; i<num_items; i++){
           var temphsn = item_set[i].split(':')[0].trim()
           var tempitem =   item_set[i].split(':')[1].trim()
           var templen =   item_set[i].split(':')[2].trim()
           var tempwid = item_set[i].split(':')[3].trim()
           var tempqty = item_set[i].split(':')[4].trim()
           var temprate = item_set[i].split(':')[5].trim()
 
           itme_hsns.push(temphsn)
           item_names.push(tempitem);
           item_qtys.push(tempqty);
           item_rates.push(temprate)
           item_len.push(templen);
           item_wid.push(tempwid);
         }


         var uni_item_dict={}

         for(i=0; i<item_names.length; i++){
            uni_item_dict[item_names[i]]=[];
         }

         for(i=0; i<item_names.length; i++){
             var tempd = {'l': item_len[i], 'w': item_wid[i], 'q': item_qtys[i], 'r': item_rates[i], 'h': itme_hsns[i]};
             uni_item_dict[item_names[i]].push(tempd);
         }

         console.log(uni_item_dict)

         var item_table = '<table class="item_table", style = "margin-top:5%;" , border="1"><tr class="head_row"> <th rowspan="2" , width="7%"> HSN Code </th> <th rowspan="2", width="13%"> Item </th> <th colspan="3", width="40%", style="border-bottom:0;" >Detail</th> <th rowspan="2", width="10%"> Quantity (&#13217) </th> <th rowspan="2", width="15%">Rate (&#8377 / &#13217)</th> <th rowspan="2", width="22%">Amount (&#8377)</th>  </tr>   <tr class="head_row"> <th width="17%", class="nob_h"> Size </th> <th width="10%", class="nob_h"> Pieces </th> <th width="12%",   class="nob_h"  > Sub-Qty (&#13217) </th> </tr>   </table>'
         var itable = document.createElement('div')
         itable.classList.add('item_table_div')

         itable.innerHTML = item_table
         print_div.appendChild(itable);
        var nrows=0;
        var total_p =0;
        var total_q =0;
        var total_a =0;



         for(i=0; i<Object.keys(uni_item_dict).length; i++){
             var temp_item_name = Object.keys(uni_item_dict)[i];
             for(j=0; j<uni_item_dict[temp_item_name].length; j++){
                 var temp_obj = uni_item_dict[temp_item_name][j]
                 r = document.createElement('tr');
                 r.setAttribute('border', "1");
                 r.setAttribute('border-collapse', "collapse");
                
                 if(j==0){
                
                 r.classList.add('lastrow')
                var qty=0;
                var small_amt=0;

                 for(z=0; z<uni_item_dict[temp_item_name].length; z++){

                    var to = uni_item_dict[temp_item_name][z]
                    qty=qty+parseFloat(to['l'])*parseFloat(to['w'])*parseFloat(to['q'])
                    
                 }
                 small_amt = qty*parseFloat(to['r'])
                 qty = qty.toFixed(2)
                 small_amt = small_amt.toFixed(2)

                 total_q=total_q+ parseFloat(qty);
                 total_a=total_a+ parseFloat(small_amt);
                 
                 var row = '<td class="sp" rowspan="'+uni_item_dict[temp_item_name].length.toString()+'">'+ temp_obj['h'] +'</td> <td class="sp" rowspan="'+uni_item_dict[temp_item_name].length.toString()+'">'+temp_item_name+'</td>'+'<td   class="sp"   >'+temp_obj['l']+' &#215; '+temp_obj['w']+'</td>'+'<td  class="sp"    >'+temp_obj['q']+'</td>'+'<td  class="sp">'+ (parseFloat(temp_obj['l'])*parseFloat(temp_obj['w'])*parseFloat(temp_obj['q'])).toFixed(2).toString() +'</td> <td class="sp" rowspan="'+uni_item_dict[temp_item_name].length.toString()+'">'+qty.toString()+'</td> <td class="sp" rowspan="'+uni_item_dict[temp_item_name].length.toString()+'">'+temp_obj['r']+'</td>  <td class="sp" rowspan="'+uni_item_dict[temp_item_name].length.toString()+'">'+ addcomma(small_amt.toString())+'</td>'
                }

                 else{
                
                    var row = '<td   class="sp" >'+temp_obj['l']+'&#215; '+temp_obj['w']+'</td>'+'<td  class="sp"    >'+temp_obj['q']+'</td>'+'<td class="sp">'+(parseFloat(temp_obj['l'])*parseFloat(temp_obj['w'])*parseFloat(temp_obj['q'])).toFixed(2).toString()+'</td>'
                }
                total_p = total_p + parseInt(temp_obj['q'])
                 r.innerHTML = row;
                 if(j==uni_item_dict[temp_item_name].length-1){
                     r.classList.add('lastrow');
                 }
                 r.classList.add('entry')
                 print_div.querySelector('.item_table').appendChild(r);
                 nrows=nrows+1;
                }         
         }

    var left = 24-nrows;
    var theight = left*0.5;

    r = document.createElement('tr');
    r.setAttribute('style', 'height: '+theight.toString()+'cm');
    r.innerHTML = '<td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td>'
    print_div.querySelector('.item_table').appendChild(r);
 

total_a=total_a.toFixed(2)
total_q=total_q.toFixed(2)

    r = document.createElement('tr');
    r.innerHTML = '<td colspan="2"> <b> Total: </b> </td> <td colspan="2"><b>   Pieces: &nbsp <span class="entry">' + total_p.toString() + '</span></b></td> <td colspan="2"><b> Quantity:&nbsp <span class="entry">' + total_q.toString() + '</span> &#13217 </b></td> <td colspan="2"><b>Amount:&nbsp &#8377 <span class="entry"> '  + addcomma(total_a.toString()) +  ' </span></b></td>'
    print_div.querySelector('.item_table').appendChild(r);

    function addcomma(x){
        x=x.toString();
        var afterPoint = '';
        if(x.indexOf('.') > 0)
           afterPoint = x.substring(x.indexOf('.'),x.length);
        x = Math.floor(x);
        x=x.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
        return(res)
    }

    var a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    var b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lac ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}

var aiw = inWords((1.18*total_a).toFixed(0));
if(client_details['State']!='Haryana'){


    r = document.createElement('tr');
    r.innerHTML = '<td colspan="6" rowspan="2" style="font-size:1.2em">Grand Total (in words): &#8377 <span class="entry">'+ aiw+ '</span></td> <td colspan="1">IGST (18%) </td> <td> <span class="entry">'+addcomma((0.18*total_a).toFixed(2).toString())+'</span></td>'
    r.setAttribute('style', 'font-weight:bold')
    print_div.querySelector('.item_table').appendChild(r);

    r = document.createElement('tr');
    r.innerHTML = '<td colspan="1">Grand Total </td> <td>'+' &#8377 <span class="entry">'+addcomma((1.18*total_a).toFixed(0).toString())+'</span></td>'
    r.setAttribute('style', 'font-weight:bold; font-size:1.2em;')
    print_div.querySelector('.item_table').appendChild(r);
}
else{

    r = document.createElement('tr');
    r.innerHTML = '<td colspan="6" rowspan="3" style="font-size:1em">Grand Total (in words): &#8377 <span class="entry">'+ aiw+ '</span> </td> <td colspan="1">SGST (9%) </td> <td> <span class="entry">'+addcomma((0.09*total_a).toFixed(2).toString())+'</span></td>'
    r.setAttribute('style', 'font-weight:bold')
    print_div.querySelector('.item_table').appendChild(r);

    r = document.createElement('tr');
    r.innerHTML = '<td colspan="1">CGST (9%) </td> <td> <span class="entry">'+addcomma((0.09*total_a).toFixed(2).toString())+'</span></td>'
    r.setAttribute('style', 'font-weight:bold')
    print_div.querySelector('.item_table').appendChild(r);


    r = document.createElement('tr');
    r.innerHTML = '<td colspan="1">Grand Total </td> <td> &#8377 <span class="entry">  '+addcomma((1.18*total_a).toFixed(0).toString())+'</span> </td>'
    r.setAttribute('style', 'font-weight:bold; font-size:1em;')
    print_div.querySelector('.item_table').appendChild(r);

}

var footer = document.createElement('div');
var ihtml='<div class="acc_table"><br><table> <caption><b><i>Our Bank Details:</i></b> </caption><tr> <td><b>Bank</b></td> <td>ICICI Bank Ltd.</td> <td>HDFC Bank Ltd.</td><tr> <tr><td><b>Branch</b></td> <td> Gobind Puri Road, <br> Yamuna Nagar</td> <td>Village - Jorian, <br>Yamuna Nagar </td> </tr>  <tr> <td><b>A/C No.</b></td> <td>024705500543</td> <td>50200031468031</td></tr> <tr><td><b>IFSC</b> </td>  <td>ICIC0000247</td> <td>HDFC0003322</td> </tr>         </table></div>  <span class="sign"> <hr class="sign_line"><b>Authorized Signatory</b> </span> <br>';
ihtml = ihtml+ '<span class="tnc"><b><i>Terms and Conditions: <br></i></b> 1. It is certified that all the given partculars are correct, and that the amount indicated represents the actual amount, i.e., there is no additional flow directly from the buyer.<br>     2. All disputes subject to Jagadhri jurisdiction only. <br> 3. Interest will be charged @ 18% p.a. after 30 days. <br> 4. Goods once sold will not be taken back. <br>5. If total transaction exceeds Rs. 2,00,000/-, only NEFT/ RTGS/ Cheque/ DD will be accepted. </span> <br> <hr> <b> Behind Swagatam Dharam Kanta, Vill. Jorian, Yamuna Nagar, Haryana (135001) | Ph. +91 9355526801</b>'

footer.innerHTML=ihtml;
footer.classList.add('footer');
print_div.appendChild(footer)

}

document.title = "WoodyFarms_"+billnum+'_'+final_date+'_'+final_time;
window.print();

        }, function(tx, e){console.log('Error!', e.message)
      })
      });

    }

    else{
        window.alert('Incomplete Billing Details')
    }
})


// sync rates of same items

document.querySelector('.item_names').addEventListener('change', (e)=>{
    // no other item of the same category exists: leave empty
    var its = document.querySelectorAll('.item_names');
    if(its.length==1){
        return;
    }
    for(i=0;i<its.length; i++){
        if(its[i]==e.srcElement){
            continue;
        }
        if(its[i].value){
          e.srcElement.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.value  =   its[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.value 
          break;
        }
    }
    //same type item exists: rate copy 
});


//rate changed for a certain item: do the same for all others of the same category. 

document.querySelector('.item_rates').addEventListener('change', (e)=>{
    var itms = document.querySelectorAll('.item_names');
    var newrate = e.srcElement.value;
    var itm_name = e.srcElement.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.value;
    console.log(itm_name)
    for(i=0; i<itms.length;i++){
        if(itms[i].value==itm_name){
            itms[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.value  =   itms[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.value = newrate
        }
    }
})






function calculateAmount(){
    f_items = document.querySelector('.itemInput_div').children;
    console.log(f_items.length)
    var tot = 0;
    for(i=0; i<f_items.length; i++){
       var tempval =  parseFloat(f_items[i].children[4].value) * parseFloat(f_items[i].children[6].value) * parseFloat(f_items[i].children[8].value) * parseFloat(f_items[i].children[9].value);
       tot=tot+tempval;
       console.log(parseFloat(f_items[i].children[4].value), parseFloat(f_items[i].children[6].value), parseFloat(f_items[i].children[8].value), parseFloat(f_items[i].children[9].value))
    }
    return tot.toFixed(2);

}



window.onload=function(){
    
//auto date & time
var d = new Date(); 
var month = d.getMonth();
var year = d.getFullYear();
var dt = d.getDate();

var hours = d.getHours();
var min = d.getMinutes();
if(min<10   ){
    min='0'+min;
}
else{
    min=min.toString();
}
var ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'

if (hours<10){
    hours='0'+hours
}
else{
    hours=hours.toString()
}

document.querySelector('#year').value=year;
document.querySelector('#date').value=dt;
document.querySelector('#month').value=month;

document.querySelector('#miniute').value=min
document.querySelector('#hours').value=hours
document.querySelector('#ampm').value=ampm

console.log(dt, month, year);
console.log(hours, min)




//auto bill number
var comm1 = 'SELECT num FROM BILLNUM;';
var db = openDatabase('WOODYFAMRS', '1.0', 'WF DATABASE', 200 * 1024 * 1024);

db.transaction(function (tx) {
    tx.executeSql(comm1, [], function (tx, results) {
     console.log('done')
     var prevnum = results.rows.item(0)['num'];
     console.log(prevnum); 
     document.querySelector('#billNumber').value=prevnum+1;
    }, function(tx, e){console.log('Error!', e.message)
  })
  });


//add bill number edit listener
document.querySelector('#billNumber').addEventListener("change", function(e){
    console.log('bill num changed');
    var new_bnum = document.querySelector('#billNumber').value;

    //  search transaction database and then fill entries.
    var transac = '';
    var comm4 = "SELECT * FROM TRANSACTIONS WHERE BillNum='"+new_bnum.toString()+"';";
    var db = openDatabase('WOODYFAMRS', '1.0', 'WF DATABASE', 200 * 1024 * 1024)
    db.transaction(function (tx) {
        tx.executeSql(comm4, [], function (tx, results) {
        
            if(results.rows.length!=0){
        console.log('done', results.rows.item(0)); 
        transac = results.rows.item(0);

        //Parse transac and populate fields.
        var t_date = transac['Date']
        var t_time = transac['Time']
        var t_client = transac['ClientName']
        var t_vehicleno = transac['VehicleNo']
        var t_items = transac['Items']
        var t_amount = transac['Amount'].toString()

        console.log(t_date, t_time, t_client, t_vehicleno, t_items, t_amount);
        
        document.querySelector('#client').value = t_client;
        document.querySelector('#vehicleno').value = t_vehicleno;
        document.querySelector('#amount').value = t_amount;

        var date_elements = t_date.split('-');
        document.querySelector('#date').value = date_elements[2];  
        document.querySelector('#year').value = date_elements[0];
        var month_map={
            'Jan':0,
            'Feb':1,
            'Mar':2,
            'Apr':3,
            'May':4,
            'Jun':5,
            'Jul':6,
            'Aug':7,
            'Sept':8,
            'Oct':9,
            'Nov':10,
            'Dec':11
        };
        document.querySelector('#month').value =  month_map[date_elements[1]];

        time_elements = t_time.split(':')
        document.querySelector('#hours').value = time_elements[0];
        document.querySelector('#ampm').value = time_elements[1].slice(time_elements[1].length-2)
        document.querySelector('#miniute').value = time_elements[1].split(' ')[0]


        var item_set = t_items.split('_/_')
        console.log(item_set)
        var num_items = parseInt(item_set[0]);
        item_set=item_set.splice(1)
        var item_hsnc = []
        var item_names = []
        var item_qtys = [] 
        var item_rates = []
        var item_len = []
        var item_wid = []

        for(i=0; i<num_items; i++){
          var temphsnc = item_set[i].split(' : ')[0].trim()
          var tempitem =   item_set[i].split(':')[1].trim()
          var templen =   item_set[i].split(':')[2].trim()
          var tempwid = item_set[i].split(':')[3].trim()
          var tempqty = item_set[i].split(':')[4].trim()
          var temprate = item_set[i].split(':')[5].trim()

          item_hsnc.push(temphsnc)
          item_names.push(tempitem);
          item_qtys.push(tempqty);
          item_rates.push(temprate)
          item_len.push(templen);
          item_wid.push(tempwid);
        }

        for(i=0; i<num_items-1; i++){
            document.querySelector('#addItem').click();
        }

        var n_item_divs=document.querySelector('.itemInput_div').children
        for(i=0;i<n_item_divs.length;i++){
            n_item_divs[i].children[0].value=item_hsnc[i];
            n_item_divs[i].children[2].value=item_names[i];
            n_item_divs[i].children[4].value=item_len[i];
            n_item_divs[i].children[6].value=item_wid[i];
            n_item_divs[i].children[8].value=item_qtys[i];
            n_item_divs[i].children[9].value=item_rates[i];
        }}
        else{
            console.log('No record for bill number='+new_bnum+' found!')
        }

        }, function(tx, e){
            console.log('Error!', e.message)
            //no transaction found!!
      })
      });

  })


//populate clients
var command = 'SELECT Name FROM CLIENTS';
var db = openDatabase('WOODYFAMRS', '1.0', 'WF DATABASE', 200 * 1024 * 1024)
db.transaction(function (tx) {
  tx.executeSql(command, [], function (tx, results) {

    // console.log(results);
    var client_sel = document.querySelector('#client');

    var len = results.rows.length, i;
    for (i = 0; i < len; i++) {
    
        var ne = document.createElement('option')
        ne.setAttribute('value', results.rows.item(i)['Name'])
        ne.innerHTML = results.rows.item(i)['Name'].toString()
        client_sel.appendChild(ne)
 
    }
  }, function(tx, e){console.log('Error!', e.message)
})
})

// print()

}
