/*
<td id="hightitle"></td>
<td id="highname"> </td>
<td id="highlastname"></td>
<td id="highbid"></td>


<li class="list-group-item small text-muted" id="last_title">Title</li>
<li class="list-group-item small text-muted" id="last_firstname">First Name</li>
<li class="list-group-item small text-muted" id="last_lastname">Last Name</li>
<li class="list-group-item small text-muted" id="last_bid">Bid</li>

*/

  //Get information about last saved person
    function getLastBidder(){
      Person.getLastBidderPerson(function(error,result){
        if(error){
          console.log(error);
        }
        else{
          console.log(result);
          var name = result[1];
          var title = result[0];
          var last = result[2];
          var val = web3.fromWei(result[3], 'ether');

          $("#last_firstname").text(name);
          $("#last_title").text(title);
          $("#last_lastname").text(last);
          $("#last_bid").text(val);
        }
      });
    }

    function getHighestBidder(){
      Person.getHighestBidderPerson(function(error,result){
        if(error){
          console.log(error);
        }
        else{
          console.log(result);
          var name = result[1];
          var title = result[0];
          var last = result[2];
          var val = web3.fromWei(result[3], 'ether');

          $("#highname").text(name);
          $("#hightitle").text(title);
          $("#highlastname").text(last);
          $("#highbid").text(val);

        }
      });
    }

    // function updateBidders(title,val1, name,val2, last, val3, bid,val4){
    //   $("#").text(val1)
    //   $("#name").text(val1)
    //   $("#last").text(val1)
    //
    // }

   // Our future code here..
   $(function() {

      $("#success_message").hide();
      $("#error_message").hide();

      $(".close").click(function(){
          $("#success_message").hide();
          $("#error_message").hide();
      }
      );


      loadWeb3();

      getLastBidder();
      getHighestBidder();

       // Code here
       $("#savebutton").click(function(){
            var title = $("#title").val();
            var firstname = $("#firstname").val();
            var lastname = $("#lastname").val();
            var bid = parseFloat($("#bid").val());
            var inWei = web3.toWei(bid, 'ether')


            Person.setPerson(title,firstname,lastname,{from: web3.eth.accounts[0], gas: 1000000, value: inWei}, function(error,result){
                if(error){
                  $("#error_text").text(error);
                  $("#error_message").show();
                }
                else{
                  var txurl = "https://etherscan.io/tx/"+result;
                  $("#message_text").html("Transaction was propagated to blockchain. <a href='"+txurl+"'>Transaction Details</a>");
                  $("#success_message").show();
                }

                // console.log(error);
                // console.log(result);

              });
       });
   });
