document.querySelector('#findTrans').addEventListener('click', (e)=>{



    document.querySelector('#print').disabled=false;
    document.querySelector('#printSummary').disabled=false;

    e.preventDefault()
    console.log('Fetching');

    var startdiv = document.querySelector('#startDate');
    var sdt = startdiv.querySelector('#date').value;
    var smon = parseInt(startdiv.querySelector('#month').value)+1;
    var syr = startdiv.querySelector('#year').value;

    var enddiv = document.querySelector('#endDate');
    var edt = enddiv.querySelector('#date').value;
    var emon = parseInt(enddiv.querySelector('#month').value)+1;
    var eyr = enddiv.querySelector('#year').value;

    if(smon<10){
        smon = '0'+smon.toString();
    }
    else{
        smon = smon.toString();
    }

    if(emon<10){
        emon = '0'+emon.toString();
    }
    else{
        emon = emon.toString();
    }

    var start_date = syr+'-'+smon+'-'+sdt;
    var end_date = eyr+'-'+emon+'-'+edt;

    //VALIDATE FORM

    if(sdt=='' || edt=='' || syr=='' || eyr=='' || smon=='NaN' || emon=='NaN'){
        window.alert('Please enter both start and end dates')
        document.querySelector('#print').disabled=true;
        document.querySelector('#printSummary').disabled=true;
    }

    console.log(start_date, end_date)

    var comm4 = "SELECT * FROM TRANSACTIONS WHERE date between '"+start_date+"' and '"+end_date+"' ORDER BY BillNum;"
    var db = openDatabase('WOODYFAMRS', '1.0', 'WF DATABASE', 200 * 1024 * 1024)
    db.transaction(function (tx) {
        tx.executeSql(comm4, [], function (tx, results) {
            console.log(results.rows);
            document.querySelector('#outputTable').innerHTML='';
            if(results.rows.length>0){
                
                var ihtml = '<table align="center" border="1" class="trans_table"> <caption> Transactions </caption> <tr><th>Bill No.</th> <th>Client Name</th> <th>Date</th> <th>Time</th> <th>Amount</th> </tr>';
                for(i=0; i<results.rows.length;i++){
                    ihtml=ihtml+'<tr> <td>'+results.rows.item(i)['BillNum']+'</td> <td>'+results.rows.item(i)['ClientName']+'</td> <td>'+results.rows.item(i)['Date']+'</td> <td>'+results.rows.item(i)['Time']+'</td> <td>'+(results.rows.item(i)['Amount']).toString()+'</td> </tr>';
                    console.log(ihtml)
                }
                ihtml=ihtml+'</table>';
                document.querySelector('#outputTable').innerHTML=ihtml;

                document.querySelector('#printSummary').addEventListener('click', (e)=>{
                    document.querySelector('#printDiv').innerHTML=""
                   var summDiv = document.querySelector('#printSummDiv') 

                   var gst_ph = document.createElement('div');
                   
        
                    var copyname ='Original Copy'
                        
            
                    gst_ph.innerHTML = '<span class="gstin"><b>GSTIN: 06AANPL6719Q2ZV</b></span><br> ';
                    summDiv.appendChild(gst_ph);
                        

                    var heading = document.createElement('span');
                    heading.innerHTML = 'WOODY FARMS';
                    heading.classList.add('title');
                    summDiv.appendChild(heading)
                
                    var subheading = document.createElement('span');
                    subheading.innerHTML = '(A Timber Industry) <br> Manufacturer and Supplier of all kinds of Timber & Plywood <br> Behind Swagatam Dharam Kanta, Vill. Jorian, Yamuna Nagar, Haryana (135001), Ph. +91 9355526801';
                    subheading.classList.add('subtitle');
                    summDiv.appendChild(subheading)

                    var table = document.createElement('div');
                    table.innerHTML = document.querySelector('#outputTable').innerHTML;
                    table.classList.add('summtable');
                    summDiv.appendChild(table)

                    document.title = "WoodyFarms_"+start_date+'_'+end_date+'_Summary';
                    window.print();
                })



                document.querySelector('#print').addEventListener('click', (e)=>{
                // width = 29*results.rows.length
                // document.querySelector('#printDiv').setAttribute('style', "height:"+width+"cm;")
                 document.querySelector('#printSummDiv').innerHTML=""
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
                    var client_name_arr = '('
                    for(k=0;k<results.rows.length;k++){
                        client_name_arr= client_name_arr +'"'+ results.rows.item(k)['ClientName']+'"'
                        if(k!=results.rows.length-1){
                            client_name_arr=client_name_arr+",";
                        }
                    }
                    client_name_arr=client_name_arr+')';


                var address_dict = {};
                var state_dict={};
                var gstin_dict={};
                var nni=0;
                    var comm5 = 'SELECT * FROM CLIENTS WHERE Name IN '+client_name_arr+';'
                    var db = openDatabase('WOODYFAMRS', '1.0', 'WF DATABASE', 20000 * 1024 * 1024)
                    db.transaction(function (tx) {
                        tx.executeSql(comm5, [], function (tx, results1) {

                         for(rn = 0; rn<results1.rows.length; rn++){
                             temp_name = results1.rows.item(rn)['Name']
                             temp_add = results1.rows.item(rn)['Address']
                             temp_state = results1.rows.item(rn)['State']
                             temp_gstn = results1.rows.item(rn)['GSTIN']

                             address_dict[temp_name] = temp_add;
                             state_dict[temp_name] = temp_state;
                             gstin_dict[temp_name] = temp_gstn;

                            }

                            for(nni=0; nni<results.rows.length;nni++){

                                var co = results.rows.item(nni);
                                var billnum = co['BillNum'];
                                var client_name = co['ClientName'];
                                var vehicleno = co['VehicleNo']
                                var grno = co['GRNo']
                                var final_time = co['Time'];
                                var final_date= co['Date'].split('-')[2]+'-'+co['Date'].split('-')[1]+'-'+co['Date'].split('-')[0]
                                var items = co['Items']
       
                                var client_details={};
                                
                                client_details['Address'] = address_dict[client_name];
                                client_details['State']=state_dict[client_name];
                                client_details['GSTIN']=gstin_dict[client_name];
       
       
                                var print_div =  document.createElement('div');
                                print_div.classList.add('printDiv')
       
       
                                //REST 
                                var gst_ph = document.createElement('div');
                   
                   
                                var copyname ='Original Copy'
                                 
                        
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
                                 ihtml=ihtml+'<span class="date_time"> <b>Date:</b> <span class="entry">'+final_date+'</span><br> <b>Time: </b><span class="entry">'+final_time+'</span><br> <b>Vehicle No.: </b> <span class="entry">'+vehicleno+'</span><br> <b>GRNo.: </b><span class="entry">'+grno+'</span></span>'
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

                        document.querySelector('#printDiv').appendChild(print_div)
                           
                        }
       
                         console.log('done');
                         document.title = "WoodyFarms_"+start_date+'_'+end_date;
                         window.print();

                    }, function(tx, e){console.log('Error!',e)})});                    
        })
}
}, function(tx,e){
            console.log('Error', e);
        })})

})