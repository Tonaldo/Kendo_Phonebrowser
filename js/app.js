    $(function() {
        
                    var grid = $("#grid").kendoGrid({

                      //Datasource to define which data Kendo Grid uses
                        dataSource: {
                            type: "json",
                            transport: {
                              read: { 
                                url: "/Phones"
                              },
                              create: {
                                url: "/Phones",
                                type: "POST"
                              }
                             }
                        },
                        serverPaging: false,
                        sortable: true,
                        pageable: {  // Pager config
                        pageSize: 5,
                        buttonCount: 1,
                        numeric: false,
                        info: true
                         },
                        detailTemplate: kendo.template($("#template").html()), // Defines that we use template which was created above
                        detailInit: detailInit, // Defines details action below
                        mobile: true,
                        schema: {
                        model: {
                            id: 'test',
                            fields: {
                                Onetime: { type: "number" },
                                Monthly: { type     : "number" },
                                Stock: {type: "string"}
                            }
                        }
                        },
                        //Actions when data is bound to grid
                        dataBound: function() {
                           
                            //If stock is "out of stock", color the text 'red'
                          
                             $('td').not(':first-child').each(function(){if($(this).text()==''){$(this).addClass('outofstock')}});
                             $('td').not(':first-child').each(function(){if($(this).text()==''){$(this).append("000 - Out of Stock")}});
                             // Make table more easily readable using odd & even rules
                            $( "tr:odd" ).css( "background-color", "#e9e9e9" );
                            // Adds to Monthly-column static bolded per mo -text
                            $( ".monthlyClass" ).append("<strong> /mo </strong>");
                            // Adds to Display-column static inches mark
                            $( ".displayClass" ).append("&quot;");

                            // Goes through all Onetime -payment table cells and forces to use two decimals
                             $( ".onetimeClass" ).each(function( index ) {
                            var decimal = parseFloat($(this).html()).toFixed(2);
                            $(this).replaceWith("<td class='displayClass' role='gridcell'>"+decimal+"€"+"</td>");
                            });

                            // Goes through all Monthly -payment table cells and forces to use two decimals
                            $( ".monthlyClass" ).each(function( index ) {
                                var decimal = parseFloat($(this).html()).toFixed(2);
                                $(this).replaceWith("<td class='displayClass' role='gridcell'>"+decimal+"€"+"</td>");
                            });

                        }, 

                        //Defining which columns/header there will be. Using this, Kendo can automatically assign values under them.
                        columns: [
                            {
                                field: "Model",
                                title: "Model",
                                width: "260px"
                            },
                            {
                                field: "Display",
                                title: "Display",
                                width: "160px",
                                attributes: {
                                "class": "displayClass"
                                }
                            },
                            {
                                field: "OS",
                                width: "160px"
                            },
                            {
                               field: "Stock",
                               width: "160px",
                               type: "number"
                            
                            },
                            {
                                field: "Monthly",
                                width: "160px",
                                type: "number",
                                attributes: {
                                "class": "monthlyClass"
                                 }
                            },
                            {
                                field: "Onetime",
                                width: "160px",
                                type: "number",
                                attributes: {
                                "class": "onetimeClass"
                                 }
                            }
                            
                        ]      
                     });

                        var validator = $("#phoneForm").kendoValidator().data("kendoValidator"),
                            status = $(".status");
                        // Kendo's own validation process
                         $("form").submit(function(event) {
                        if (validator.validate()) {
                            status.text("Phone added!")
                                .removeClass("invalid")
                                .addClass("valid");
                        } else {
                            status.text("Oops! There is invalid data in the form.")
                                .removeClass("valid")
                                .addClass("invalid");
                        }
                        });

                  
                                

                        var timeout;
                    $("#search").find("#searchBox").keydown(function() {
                    // Keydown makes filter live action so no need to press any buttons
                    // Clears any pending filtering requests 
                    clearTimeout(timeout);
                    var searchValue = $('#searchBox').val();
                    // Filters the grid after 100 milliseconds
                        timeout = setTimeout(function() {
                            grid.data("kendoGrid").dataSource.filter({
                                      logic  : "or",
                                      filters: [
                                      {
                                        field   : "Model",
                                        operator: "contains",
                                        value   : searchValue
                                      },
                                      {
                                        field   : "Display",
                                        operator: "contains",
                                        value   : searchValue
                                      },
                                      {
                                        field   : "OS",
                                        operator: "contains",
                                        value   : searchValue
                                      }
                                     
                                    ]
                            });
                        }, 100);
                    });


                        //Adds details some fade effect
                    function detailInit(e) {
                        var detailRow = e.detailRow;
                        detailRow.find(".tabstrip").kendoTabStrip({
                            animation: {
                                open: { effects: "fadeIn" }
                            }
                        });
                    }

                 // Adds some resizing for mobile screens
                    $(window).on("resize", function() {
                        kendo.resize($(".wrapper"));
                    });      
                 
                 // Functionality to new button which adds slow toggle animation.
                    $( "#addNew" ).hide();
                    $( "#addNew-btn" ).click(function() {
                        $( "#addNew" ).toggle( "slow" );
                    });
    }); 