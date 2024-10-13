let loginpage = {
	widgets: {
		formWidget: {
			type: "widgetform",
			selector: "#formcontainer",
			options: {
				div: "ui large form",
				structure: [
					{
						div: "ui stacked segment", structure: [
							{ div: "field", id: "username" },
							{ div: "field", id: "password" },
							{ div: "ui fluid large teal button", id: "submitbutton", html: "Giriş" }
						]
					},
					{ div: "ui error message" }
				],
				rules: {
					fields: {
						email: {
							identifier: 'username',
							rules: [
								{
									type: 'empty',
									prompt: 'E-mail adresi girin'
								},
								{
									type: 'email',
									prompt: 'E-mail geçersiz'
								}
							]
						},
						password: {
							identifier: 'password',
							rules: [
								{
									type: 'empty',
									prompt: 'Sifre girin'
								}
							]
						}
					}
				}
			}
		},
		usernameWidget: {
			type: "input",
			selector: "#username",
			options: {
				div: "ui left icon input",
				icon: "user icon",
				type: "text",
				name: "username",
				placeholder: "E-mail"
			}
		},
		passwordWidget: {
			type: "input",
			selector: "#password",
			options: {
				div: "ui left icon input",
				icon: "lock icon",
				type: "password",
				name: "password",
				placeholder: "Şifre"
			}
		},
		registerlink: {
			type: "link",
			selector: "#registerlink",
			options: {
				href: "register.html",
				html: "Kayıt Olun"
			}
		}
	},
	services: {
		loginService: {
			source: "ajax",
			url: "token"
		}
	}
};
let registerpage = {
	widgets: {
		container: {
			type: "widgetform",
			selector: "#registerformcontainer",
			options: {
				div: "content ui transition fade in container large form",
				structure: [
					{
						div: "ui stacked segment", structure: [
							{
								div: "ui secondary segment", structure: [
									{ p: "noclass", html: "Yeni Kayıt" }
								]
							},
							{
								div: "ui segment", structure: [
									{
										div: "ui grid", structure: [
											{
												div: "ui sixteen wide column", structure: [
													{ div: "field #name" },
													{ div: "field #company" },
													{ div: "field #mail" },
													{ div: "field #department" },
													{ div: "field #door" },
													{ div: "field #address" },
													{ div: "field #phone" }
												]
											},
											{
												div: "ui sixteen wide column", structure: [
													{ div: "ui fluid large teal button #registerbutton", html: "Giriş" }
												]
											}
										]
									}
								]
							}
						]
					},
					{ div: "ui error message" },
					{
						div: "ui success message hidden", structure: [
							{ div: "header", html: "Kayıt başarılı." },
							{ p: "noclass #loginlink", html: "E-posta adresiniz ve gelen şifre ile giriş ekranından giriş yapabilirsiniz." }
						]
					}
				],
				rules: {
					fields: {
						mail: {
							identifier: 'mail',
							rules: [
								{
									type: 'empty',
									prompt: 'Please enter your e-mail'
								},
								{
									type: 'email',
									prompt: 'Please enter a valid e-mail'
								},
								{
									type : 'maxLength[100]',
									prompt : 'Mail adresi en fazla 100 karakter olabilir!'
								}
							]
						},
						name: {
							identifier: 'name',
							rules: [
								{
									type: 'empty',
									prompt: 'Please enter your name & surname'
								},
								{
									type : 'maxLength[50]',
									prompt : 'Kullanıcı adı en fazla 50 karakter olabilir!'
								}
							]
						},
						company: {
							identifier: 'company',
							rules: [
								{
									type: 'empty',
									prompt: 'Please enter company or institue name'
								},
								{
									type : 'maxLength[100]',
									prompt : 'Şirket ismi fazla 100 karakter olabilir!'
								}
							]
						},
						department: {
							identifier: 'department',
							rules: [
								/*
								{
									type: 'empty',
									prompt: 'Please enter your department name'
								}*/
								{
									type : 'maxLength[100]',
									prompt : 'Departman en fazla 100 karakter olabilir!'
								}
							]
						},
						door: {
							identifier: 'door',
							rules: [
								/*
								{
									type: 'empty',
									prompt: 'Please enter your door number'
								}*/
								{
									type : 'maxLength[50]',
									prompt : 'Kapı no en fazla 50 karakter olabilir!'
								}
							]
						},
						address: {
							identifier: 'address',
							rules: [
								/*
								{
									type: 'empty',
									prompt: 'Please enter your address'
								}*/
								{
									type : 'maxLength[500]',
									prompt : 'Adres en fazla 500 karakter olabilir!'
								}
							]
						},
						phone: {
							identifier: 'phone',
							rules: [
								/*
								{
									type: 'empty',
									prompt: 'Please enter your phone'
								}*/
								{
									type : 'maxLength[50]',
									prompt : 'Tel no en fazla 50 karakter olabilir!'
								}
							]
						}
					}
				}
			}
		},
		loginlink: {
			type: "link",
			selector: "#loginlink",
			options: {
				href: "index.html",
				html: "Giriş Sayfası"
			}
		}
	},
	services: {
		register: {
			source: "ajax",
			url: "register"
		},
		tableService: {
			source: "static",
			data: [],
		}
	}
}
let ordercustomeritems = {
	container: {
		type: "widgetform",
		selector: "#maincontainer",
		options: {
			div: "content ui transition fade in container large form",
			structure: [
				{
					div: "ui stacked segment", structure: [
						{
							div: "ui secondary segment", structure: [
								{ p: "noclass", html: "Müşteri Bilgileri" }
							]
						},
						{
							div: "ui segment", structure: [
								{
									div: "ui grid", structure: [
										{
											div: "ui sixteen wide column", structure: [
												{ div: "field #name" },
												{ div: "field #company" },
												{ div: "field #mail" },
												{ div: "field #department" },
												{ div: "field #door" },
												{ div: "field #address" },
												{ div: "field #phone" }
											]
										},
										{ div: "ui sixteen wide column #billingtable" },
										{ div: "ui four wide column #button_container" },
										{
											div: "ui sixteen wide column", structure: [
												{ div: "ui fluid large teal button #updatebutton", html: "Güncelle" }
											]
										}
									]
								}
							]
						}
					]
				},
				{ div: "ui error message" },
				{
					div: "ui success message hidden", structure: [
						{ div: "header", html: "Güncelleme başarılı." }
					]
				}
			]
		}
	},
	billingtable: {
		type: "table",
		selector: "#billingtable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "billingaddress",
				columns: ["id", "taxoffice", "taxnumber", "address", "project", "natid", "phone", "mail", "userid"],
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				lengthChange: true,
				responsive: true,
				select: true,
				dom: '<"top">Brt<"bottom"><"clear">',
				columns: [{ data: "id", visible: false, type: "hidden" },
				{ data: "taxoffice", name: "taxoffice", title: "Vergi Dairesi" },
				{ data: "taxnumber", name: "taxnumber", title: "Vergi No." },
				{ data: "address", name: "address", title: "Adres", width: "20%" },
				{ data: "project", name: "project", title: "Proje" },
				{ data: "natid", name: "natid", title: "TC Kimlik No." },
				{ data: "phone", name: "phone", title: "Telefon" },
				//{ data: "acm_user.username", name: "acm_user.id", title: "Kullanıcı İsmi", type: "select", placeholder: "", editField: ["acm_user.id"] },
				{ data: "mail", name: "mail", title: "E-posta" },
				{ data: "userid", name: "userid", visible: false, type: "hidden" },
				],
				select: {
					style: 'os',
					className: 'active'
				},
				buttons: [
					{
						extend: "create", editor: true, text: "Yeni"
						, formTitle: "Yeni fatura girişi oluştur."
					},
					{
						extend: "edit", editor: true, text: "Güncelle"
						, formTitle: "Seçili fatura girişini değiştir."
					},
					{
						extend: "remove", editor: true, text: "Sil"
						, formMessage: "Seçili fatura girişini silmek istediğinize emin misiniz?"
						, formTitle: "Sil"
					}
				]
			},
			editor: {
				/*
				bubble: {
					submit: "allIfChanged",
					selector: "tbody td:not(:last-child)"
				},*/
				idSrc: 'id'
			}
		}
	}
};
let registerinputbase = {
	type: "input",
	options: {
		div: "ui right labeled fluid input",
		type: "text",
		label: {
			label: "ui blue basic label",
		}
	}
};

let registerinputs = [
	{ id: "name", placeholder: "Adınızı Soyadınızı Giriniz", label: "Ad Soyad" },
	{ id: "company", placeholder: "Kurumunuzun Adını Giriniz", label: "Kurum" },
	{ id: "mail", placeholder: "E-posta Adresinizi Giriniz", label: "E-posta", type: "mail" },
	{ id: "department", placeholder: "Bölümünüzü Giriniz", label: "Bölüm" },
	{ id: "door", placeholder: "Oda Numaranızı Giriniz", label: "Oda Numarası" },
	{ id: "address", placeholder: "Teslimat Adresinizi Giriniz", label: "Teslimat Adresi" },
	{ id: "phone", placeholder: "Telefon Numaranızı Giriniz", label: "Telefon" }
];

registerinputs.forEach(function (i) {
	let wdg = JSON.parse(JSON.stringify(registerinputbase));
	wdg.selector = "#" + i.id;
	if (i.type) wdg.options.type = i.type;
	wdg.options.placeholder = i.placeholder;
	wdg.options.name = i.id;
	if (i.label && wdg.options.label) wdg.options.label.html = i.label;
	registerpage.widgets[i.id] = wdg;
	ordercustomeritems[i.id] = wdg;
	ordercustomeritems[i.id].options.datasource = "tableService";
	ordercustomeritems[i.id].options.fetchparams = {
		table: "users",
		columns: [i.id]
	};
	ordercustomeritems[i.id].options.oncreate = true;
});

let ordernavbaritems = {
	navbar: {
		type: "container",
		selector: "#navbarcontainer",
		options: {
			div: "ui fixed main menu",
			structure: [
				{
					div: "ui container",
					structure: [
						{
							div: "vertically fitted borderless item", structure: [
								{ div: "ui small image #logoimg" },
							]
						},
						{
							div: "right menu", structure: [
								{ div: "vertically fitted borderless item #orderslink" },
								{ div: "vertically fitted borderless item #ordersdropdown" },
								{ div: "vertically fitted borderless item #faqlink" },
								{ div: "vertically fitted borderless item #customerdropdown" },
								{ div: "vertically fitted borderless item #langdropdown" }
							]
						}
					]
				}
			]
		}
	},
	logoimg: {
		type: "img",
		selector: "#logoimg",
		options: {
			src: "assets/images/logo-white.png",
			link: "dashboard.html"
		}
	},
	orderslink: {
		type: "link",
		selector: "#orderslink",
		options: {
			style: "color: black;",
			href: "orders.html",
			icon: "archive icon",
			html: "Siparişlerim"
		}
	},
	faqlink: {
		type: "link",
		selector: "#faqlink",
		options: {
			style: "color: black;",
			href: "faq.html",
			icon: "question icon",
			html: "SSS"
		}
	},
	neworderdropdown: {
		type: "ddown",
		selector: "#ordersdropdown",
		options: {
			datasource: "orderdropdownservice",
			oncreate: true,
			div: "ui simple dropdown icon",
			header: [
				{ icon: "cart icon" },
				{ html: "Yeni Sipariş" },
				{ icon: "dropdown icon" }
			],
			dataformat: {
				img: { img: "ui avatar image" }
			}
		}
	},
	customerdropdown: {
		type: "ddown",
		selector: "#customerdropdown",
		options: {
			datasource: "userdropdownservice",
			oncreate: true,
			div: "ui simple dropdown icon",
			header: [
				{ icon: "user icon" },
				{ icon: "dropdown icon" }
			]
		}
	},
	langdropdown: {
		type: "ddown",
		selector: "#langdropdown",
		options: {
			datasource: "langdropdownservice",
			oncreate: true,
			selected: 1,
			div: "ui simple labeled dropdown icon",
			header: [
				{ span: "text" },
				{ icon: "dropdown icon" }
			],
			dataformat: {
				img: { img: "ui avatar image" }
			}
		}
	}
};

let seqproductionnavbaritems = {
	navbar: {
		type: "container",
		selector: "#navbarcontainer",
		options: {
			div: "ui fixed main menu",
			structure: [
				{
					div: "ui container",
					structure: [
						{
							div: "vertically fitted borderless item", structure: [
								{ div: "ui small image #logoimg" },
							]
						},
						{
							div: "right menu", structure: [
								{ div: "vertically fitted borderless item #orderslink" },
								{ div: "vertically fitted borderless item #pooldropdown" },
								//{ div: "vertically fitted borderless item #syntheseslink" },
								//{ div: "vertically fitted borderless item #oldsyntheseslink" },
								{ div: "vertically fitted borderless item #ekdropdown" },
								{ div: "vertically fitted borderless item #userdropdown" },
							]
						}
					]
				}
			]
		}
	},
	logoimg: {
		type: "img",
		selector: "#logoimg",
		options: {
			src: "assets/images/logo-white.png",
			link: "productionOrderList.html"
		}
	},
	orderslink: {
		type: "link",
		selector: "#orderslink",
		options: {
			style: "color: black;",
			href: "productionOrderList.html",
			icon: "sign in alternate icon",
			html: "Siparişler"
		}
	},
	pooldropdown: {
		type: "ddown",
		selector: "#pooldropdown",
		options: {
			datasource: "pooldropdownservice",
			oncreate: true,
			div: "ui simple dropdown icon",
			header: [
				{ icon: "clone icon" },
				{ html: "Havuz" },
				{ icon: "dropdown icon" }
			],
			dataformat: {
				img: { img: "ui avatar image" }
			}
		}
	},
	ekdropdown: {
		type: "ddown",
		selector: "#ekdropdown",
		options: {
			datasource: "ekdropdownservice",
			oncreate: true,
			div: "ui simple dropdown icon",
			header: [
				{ icon: "archive icon" },
				{ html: "Ek" },
				{ icon: "dropdown icon" }
			]
		}
	},
	customerdropdown: {
		type: "ddown",
		selector: "#userdropdown",
		options: {
			datasource: "userdropdownservice",
			oncreate: true,
			div: "ui simple dropdown icon",
			header: [
				{ icon: "user icon" },
				{ icon: "dropdown icon" }
			]
		}
	}
};

let productionnavbaritems = {
	navbar: {
		type: "container",
		selector: "#navbarcontainer",
		options: {
			div: "ui fixed main menu",
			structure: [
				{
					div: "ui container",
					structure: [
						{
							div: "vertically fitted borderless item", structure: [
								{ div: "ui small image #logoimg" },
							]
						},
						{
							div: "right menu", structure: [
								{ div: "vertically fitted borderless item #orderslink" },
								{ div: "vertically fitted borderless item #pooldropdown" },
								{ div: "vertically fitted borderless item #syntheseslink" },
								{ div: "vertically fitted borderless item #oldsyntheseslink" },
								{ div: "vertically fitted borderless item #ekdropdown" },
								{ div: "vertically fitted borderless item #userdropdown" },
							]
						}
					]
				}
			]
		}
	},
	logoimg: {
		type: "img",
		selector: "#logoimg",
		options: {
			src: "assets/images/logo-white.png",
			link: "productionOrderList.html"
		}
	},
	orderslink: {
		type: "link",
		selector: "#orderslink",
		options: {
			style: "color: black;",
			href: "productionOrderList.html",
			icon: "sign in alternate icon",
			html: "Siparişler"
		}
	},
	synthesesdropdown: {
		type: "ddown",
		selector: "#syntheseslink",
		options: {
			datasource: "synthesesdropdownservice",
			oncreate: true,
			div: "ui simple dropdown icon",
			header: [
				{ icon: "magic icon" },
				{ html: "Sıradaki Sentezler" },
				{ icon: "dropdown icon" }
			],
			dataformat: {
				img: { img: "ui avatar image" }
			}
		}
	},
	oldsyntheseslink: {
		type: "link",
		selector: "#oldsyntheseslink",
		options: {
			style: "color: black;",
			href: "productionOldSyntheses.html",
			icon: "archive icon",
			html: "Sentezler"
		}
	},
	pooldropdown: {
		type: "ddown",
		selector: "#pooldropdown",
		options: {
			datasource: "pooldropdownservice",
			oncreate: true,
			div: "ui simple dropdown icon",
			header: [
				{ icon: "clone icon" },
				{ html: "Havuz" },
				{ icon: "dropdown icon" }
			],
			dataformat: {
				img: { img: "ui avatar image" }
			}
		}
	},
	ekdropdown: {
		type: "ddown",
		selector: "#ekdropdown",
		options: {
			datasource: "ekdropdownservice",
			oncreate: true,
			div: "ui simple dropdown icon",
			header: [
				{ icon: "archive icon" },
				{ html: "Ek" },
				{ icon: "dropdown icon" }
			]
		}
	},
	customerdropdown: {
		type: "ddown",
		selector: "#userdropdown",
		options: {
			datasource: "userdropdownservice",
			oncreate: true,
			div: "ui simple dropdown icon",
			header: [
				{ icon: "user icon" },
				{ icon: "dropdown icon" }
			]
		}
	},
};

let adminnavbaritems = {
	navbar: {
		type: "container",
		selector: "#navbarcontainer",
		options: {
			div: "ui fixed main menu",
			structure: [
				{
					div: "ui container",
					structure: [
						{
							div: "vertically fitted borderless item", structure: [
								{ div: "ui small image #logoimg" },
							]
						},
						{
							div: "right menu", structure: [
								{ div: "vertically fitted borderless item #deliverylink" },
								{ div: "vertically fitted borderless item #statslink" },
								{ div: "vertically fitted borderless item #customeropdropdown" },
								{ div: "vertically fitted borderless item #defsdropdown" },
								//{ div: "vertically fitted borderless item #customerslink" },
								{ div: "vertically fitted borderless item #userdropdown" },
							]
						}
					]
				}
			]
		}
	},
	logoimg: {
		type: "img",
		selector: "#logoimg",
		options: {
			src: "assets/images/logo-white.png",
			link: "cargo.html"
		}
	},
	deliverylink: {
		type: "link",
		selector: "#deliverylink",
		options: {
			style: "color: black;",
			href: "delivery.html",
			icon: "address card outline icon",
			html: "Müşteriler"
		}
	},
	statslink: {
		type: "link",
		selector: "#statslink",
		options: {
			style: "color: black;",
			href: "customerReport.html",
			icon: "chart bar icon",
			html: "Stats"
		}
	},
	customeropdropdown: {
		type: "ddown",
		selector: "#customeropdropdown",
		options: {
			datasource: "customeropdropdownservice",
			oncreate: true,
			div: "ui simple dropdown icon",
			header: [
				{ icon: "address book outline icon" },
				{ html: "Müşteri İşlemleri" },
				{ icon: "dropdown icon" }
			]
		}
	},
	defsdropdown: {
		type: "ddown",
		selector: "#defsdropdown",
		options: {
			datasource: "defsdropdownservice",
			oncreate: true,
			div: "ui simple dropdown icon",
			header: [
				{ icon: "file alternate icon" },
				{ html: "Tanımlar" },
				{ icon: "dropdown icon" }
			]
		}
	},
	customerslink: {
		type: "link",
		selector: "#customerslink",
		options: {
			style: "color: black;",
			href: "viewCustomerList.html",
			icon: "address card outline icon",
			html: "Müşteriler"
		}
	},
	customerdropdown: {
		type: "ddown",
		selector: "#userdropdown",
		options: {
			datasource: "userdropdownservice",
			oncreate: true,
			div: "ui simple dropdown icon",
			header: [
				{ icon: "user icon" },
				{ icon: "dropdown icon" }
			]
		}
	}
};

let productionreporswidgetsall = {
	container: {
		type: "container",
		selector: "#maincontainer",
		options: {
			div: "ui vertically divided content",
			structure: [
				{ div: "ui large header", structure: [{ i: "file alternate icon" }, { div: "content", html: "Sentez Raporu" }] },
				{
					div: "ui grid", structure: [
						{
							div: "row", structure: [
								{
									div: "six wide left aligned column", structure: [
										{ div: "small basic ui button #reportexportbtn", html: "Rapor Çıktı" },
										{ div: "small basic ui input #boxesdropdown" },
										{ div: "small basic ui input #tubesdropdown" },
										{ div: "small basic ui button #csvbtn", html: "CSV" },
										{
											div: "small red ui button #synthcancel", structure: [
												{ icon: "noclass", i: "ui times circle outline icon" },
												{ span: "noclass", html: "Sentez İptali" }
											]
										}
									]
								},
								{ div: "one wide column", structure: [] },
								{
									div: "two wide column", structure: [
										{
											div: "ui small orange button #allrepeat", structure: [
												{ icon: "noclass", i: "ui recycle icon" },
												{ span: "noclass", html: "Garanti Tekrar" }
											]
										},
									]
								},
								{ div: "two wide column", structure: [
									{
										div: "ui small red button #fixMwEx", structure: [
											{ icon: "noclass", i: "ui exclamation icon" },
											{ span: "noclass", html: "Mw-Ex.Co" }
										]
									}
								]},
								{
									div: "five wide column", structure: [
										{
											div: "ui small green button #savebtn", structure: [
												{ icon: "noclass", i: "ui pencil alternate icon" },
												{ span: "noclass", html: "Kaydet" }
											]
										},
										{
											div: "ui small blue button #calculatebtn", structure: [
												{ icon: "noclass", i: "ui pencil alternate icon" },
												{ span: "noclass", html: "Hesapla" }
											]
										},
										{
											div: "ui small basic button #exportbtn", structure: [
												{ icon: "noclass", i: "ui download icon" },
												{ span: "noclass", html: "Excel İndir" }
											]
										}
									]
								}
							]
						},
						{
							div: "row", structure: [
								{
									div: "eight wide column", structure: [
										{ div: "ui input #csvf" },
										{ div: "ui input #csvi" },
									]
								},
							]
						},
						{
							div: "row", structure: [
								{ div: "three wide column", structure: [{ div: "ui green inverted button #bulkinsert", html: "A260 Toplu Ekle" }] },
								{ div: "three wide column", structure: [{ div: "noclass #elutionvolume" }] },
								{ div: "three wide column", structure: [{ div: "noclass #pathlength" }] },
							]
						},
						{
							div: "row inoalert #inocont", structure: [
								{ div: "#inoalert" }
							]
						}
					]
				},
				{ a: "transition hidden #csvlink", "attr": { "href": "empty", "download": "empty.csv" } },
				{ div: "#synthinfo" },
				{ div: "#prompt" },
				{
					div: "#mod", structure: [
						{
							div: "header #modalhead", structure: [
								{ div: "#modid" },
								{ div: "#modsynthname" }

							]
						},
						{
							div: "content", structure: [
								{
									div: "ui grid", structure: [
										{
											div: "row", structure: [
												{ div: "ui small basic button #copyseq", html: "Sekansı kopyala (Ctrl+C)" }
											]
										},
										{
											div: "ui column sixteen wide", structure: [
												{ div: "#idt" }
											]
										},
										{
											div: "row", structure: [
												{ div: "ui input idtdata #inosinebp" }, { div: "ui input idtdata #inosinegc" }, { div: "ui input idtdata #inosinemelttemp" }, { div: "ui input idtdata #inosinemw" }
											]
										},
										{
											div: "row", structure: [
												{ div: "ui input idtdata #inosineec" }, { div: "ui input idtdata #inosinenmolod" }, { div: "ui input idtdata #inosineugod" }
											]
										}

									]
								},
							]
						},
						{
							div: "actions", structure: [
								{ div: "ui green button #modalbtnset", html: "Hesapla" },
								{ div: "ui basic button #modalbtncancel", html: "Tamam" }
							]
						},
						{ div: "msgfloat #msg" }
					]
				}
			]
		}
	},
	idt: {
		type: "textarea",
		selector: "#idt",
		options: {
			div: "ui left icon fluid input",
			rows: 20,
			name: "idt",
			placeholder: "IDT OLIGO ANALYZER"
		}
	},
	msg: {
		type: "msgdiv",
		selector: "#msg",
		options: {
			closable: true,
			div: "success hidden",
			header: "Sekans kopyalandı yapıştırabilirsiniz",
			msglist: [],
			fadeout: 1000,
		}
	},
	mod: {
		type: "ACMmodal",
		selector: "#mod",
		options: {
			semanticOptions: {
				//closable: false
			}
		}
	},
	synthinfo: {
		type: "dataholder",
		selector: "#synthinfo",
		options: {
			oncreate: false,
			datasource: "editorService",
			fetchparams: {
				table: "synth",
				columns: ["id", "name", "type"],
				whereparams: ["id"],
			},
			div: "hidden"
		}
	},
	elutionvolume: {
		type: "input",
		selector: "#elutionvolume",
		options: {
			div: "ui left icon small input",
			icon: "flask icon",
			type: "text",
			name: "elutionvolume",
			placeholder: "Elution vol(uL)",
			initial: 280
		}
	},
	pathlength: {
		type: "input",
		selector: "#pathlength",
		options: {
			div: "ui left icon small input",
			icon: "road icon",
			type: "text",
			name: "pathlength",
			placeholder: "Path Length(mm)",
			initial: 10
		}
	},
	csvf: {
		type: "input",
		selector: "#csvf",
		options: {
			div: "ui left labeled small input",
			type: "number",
			name: "csvf",
			min: 0,
			label: { html: "5'(csv):", label: "ui label" },
			//placeholder: "5'(csv)",
			width: "80px",
			initial: 6
		}
	},
	csvi: {
		type: "input",
		selector: "#csvi",
		options: {
			div: "ui left labeled small input",
			type: "number",
			min: 0,
			name: "csvi",
			label: { html: "inozine(csv):", label: "ui label" },
			//placeholder: "inozine(csv)",
			width: "80px",
			initial: 6
		}
	},
	tablecontainer: {
		type: "container",
		selector: "#tablecontainer",
		options: {
			div: "ui fluid container",
			structure: [
				{ div: "ui segment #reporttable" },
				{ div: "ui page dimmer #odnotifier" }
			]
		}
	},
	boxesdropdown: {
		type: "ddown",
		selector: "#boxesdropdown",
		options: {
			datasource: "boxesdropdownservice",
			oncreate: true,
			div: "ui floating labeled icon small basic dropdown button",
			header: [
				{ icon: "boxes icon" },
				{ html: "Kutu" },
				{ icon: "dropdown icon" }
			]
		}
	},
	tubesdropdown: {
		type: "ddown",
		selector: "#tubesdropdown",
		options: {
			datasource: "tubesdropdownservice",
			oncreate: true,
			div: "ui floating labeled icon small basic dropdown button",
			header: [
				{ icon: "flask icon" },
				{ html: "Tüp" },
				{ icon: "dropdown icon" }
			]
		}
	},
	a260bulk: {
		type: "dialog",
		selector: "#dialogcontainer",
		options: {
			div: "ui fullscreen modal",
			structure: [
				{ div: "header", html: "Kolon bilgilerini buraya yapıştırınız." },
				{
					div: "ui form", structure: [
						{
							div: "field", structure: [
								{ div: "noclass #modaltextarea" }
							]
						}
					]
				},
				{
					div: "actions", structure: [
						{ div: "ui deny button", html: "Kapat" },
						{ div: "ui button #modalsend", html: "Ekle" }
					]
				}
			]
		}
	},
	modaltextarea: {
		type: "textarea",
		selector: "#modaltextarea",
		formchange: true,
		options: {
			div: "ui left icon fluid input",
			rows: 10,
			name: "modaltextarea",
			placeholder: "Buraya yapıştır."
		}
	},
	repmodal: {
		type: "dialog",
		selector: "#repmodal",
		options: {
			div: "ui fullscreen modal",
			structure: [
				{ div: "header", html: "Emin misiniz ?" },
				{ div: "noclass #modaltable" },
				{ div: "ui divider" },
				{
					div: "actions", structure: [
						{ div: "ui green button #repeatselected", html: "Tekrar Sipariş" },
						{ div: "ui deny button", html: "Kapat" }
					]
				}
			]
		}
	},
	prompt: {
		type: "prompt",
		selector: "#prompt",
		options: {
			semanticOptions: {
			}
		}
	},
}

let productionreportwidgets = { //Report-Page
	reporttable: {
		type: "table",
		selector: "#reporttable",
		options: {
			datasource: "editorService",
			oncreate: false,
			fetchparams: {
				table: "primer",
				columns: ["id", "name", "synthname", "scale", "purification",
					"userid", "orderid", "dmt", "a260", "tmbasic", "mw", "conc", "totalng", "od",
					"totalnmol", "repeat", "sequence", "synthid", "fmod", "tmod", "excoef","gc"
				],
				join: [
					{ table: "primer_puri", foreign: "purification" },
					{ table: "primer_sca", foreign: "scale" },
					{ table: "users", foreign: "userid", target: "userid" },
					{ table: "orders", foreign: "orderid" },
					{ table: "primer_fifth", columns: ["id", "mw", "e260","val"], foreign: "fmod" },
					{ table: "primer_third", columns: ["id", "mw", "e260","val"], foreign: "tmod" }
				],
				whereparams: ["synthid"],
				order: ['synthname ASC'],
			},
			table: "ui celled table",
			datatable: {
				order: [[7, "asc"]],
				columnDefs: [
					{ type: 'num-html', targets: 7 }
				],
				lengthChange: true,
				responsive: true,
				select: false,
				paging: false,
				//dom: '<"top">Brt<"bottom"><"clear">',
				columns: [
					{ data: "id", visible: false, type: "hidden" },
					{ data: null, title: "Inozin", render: "inozinbtn" },
					{ data: "sequence", name: "sequence", visible: false },
					{ data: "scale", name: "scale", visible: false },
					{ data: "orderid", name: "orderid", visible: false },
					{ data: "order.ordernum", name: "order.ordernum", visible: false },
					{ data: "name", name: "name", title: "İsim" },
					{ data: "synthname", name: "synthname", title: "Sentez No", orderDataType: "prodno"},
					{ data: "primer_sca.val", name: "primer_sca.id", title: "Skala" },
					{ data: "primer_puri.val", name: "primer_puri.id", title: "Saflaştırma" },
					{ data: "user.company", name: "user.company", title: "Şirket Adı" }, //,render: "reportname"
					{ data: "dmt", name: "dmt", title: "DMT", label: "dmt", type: "checkBox", def: false, render: "dmtrender" },
					{ data: "a260", name: "a260", title: "A260"},//,"render":"a260format" },
					{ data: "tmbasic", name: "tmbasic", title: "Tm Basic" },
					{ data: "mw", name: "mw", title: "MW" },
					{ data: "conc", name: "conc", title: "Conc.(ng/ul)"},//,"render":"nulldatafix" },
					{ data: "totalng", name: "totalng", title: "Total ng"},//,"render":"nulldatafix" },
					{ data: "od", name: "od", title: "OD"},//,"render":"nulldatafix" },
					{ data: "totalnmol", name: "totalnmol", title: "Total nmol"},//,"render":"nulldatafix" },
					{ title: "Garanti Tekrar", render: "redoicon" },
					{ data: "synthid", name: "synthid", visible: false },
					{ data: "fmod", name: "fmod", visible: false, type: "hidden" },
					{ data: "orderid", name: "orderid", visible: false },
					{ data: "excoef", name: "excoef", visible: false },
					{ data: "gc", name: "gc", visible: false },
					{ data: "primer_fifth.val", name: "primer_fifth.id", visible: false, type: "hidden",render:"nullrender"},
					{ data: "primer_third.val", name: "primer_third.id", visible: false, type: "hidden",render:"nullrender"}
				],
				//rowCallback: "rowCallback",
			},
			editor: {
				allowed: ["id", "a260", "tmbasic", "mw", "conc", "totalng", "od", "totalnmol", "dmt", "synthid", "synthname","excoef","gc"],
				inline: {
					submit: "allIfChanged",
					onBlur: 'submit'
				},
				idSrc: 'id',
				localeditor: true, // lrep
			}
		}
	},
	modaltable: {
		type: "table",
		selector: "#modaltable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "primer",
				columns: ["id", "synthname", "name", "userid", "user.company", "sequence", "totalnmol", "repeat"],
				join: [
					{ table: "users", foreign: "userid", target: "userid" }
				]
			},
			oncreate: false,
			table: "ui celled table",
			datatable: {
				responsive: true,
				dom: '<"top">rt<"bottom"p><"clear">',
				columns: [{ data: "id", name: "id", visible: false, type: "hidden" },
				{ name: "synthname", data: "synthname", title: "Sentez No" },
				{ name: "user.company", data: "user.company", title: "Şirket" },
				{ name: "name", data: "name", title: "İsim" },
				{ data: "sequence", name: "sequence", title: "Sekans", render: "ellipsis" },
				{ data: "totalnmol", name: "totalnmol", title: "Total nmol" },
				{ data: "repeat", name: "repeat", title: "Tekrar" }
				]
			},
			editor: {
				allowed: ["id", "name"],
				inline: {
					submit: "allIfChanged"
				},
				idSrc: 'id'
			}
		}
	},
};

let productionreportwidgetsp = {
	reporttable: {
		type: "table",
		selector: "#reporttable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "probe",
				columns: ["id", "name", "synthname", "userid", "orderid", "dmt", "a260", "tmbasic", "mw", "conc", "totalng", "od",
					"totalnmol", "repeat", "sequence", "synthid", "fmod", "tmod", "excoef","gc"
				],
				join: [
					{ table: "users", foreign: "userid", target: "userid" },
					{ table: "orders", foreign: "orderid" },
					{ table: "probe_fifth", columns: ["id", "mw", "e260","val"], foreign: "fmod" },
					{ table: "probe_third", columns: ["id", "mw", "e260","val"], foreign: "tmod" }
				],
				whereparams: ["synthid"],
				order: ['synthname ASC'],
			},
			//oncreate: true,
			table: "ui celled table",
			datatable: {
				order: [[6, "asc"]],
				columnDefs: [
					{ type: 'num-html', targets: 6 }
				],
				lengthChange: true,
				responsive: true,
				select: false,
				paging: false,
				//dom: '<"top">Brt<"bottom"><"clear">',
				columns: [
					{ data: "id", visible: false, type: "hidden" },
					{ data: null, title: "Inozin", render: "inozinbtn" },
					{ data: "sequence", name: "sequence", visible: false },
					{ data: "orderid", name: "orderid", visible: false },
					{ data: "order.ordernum", name: "order.ordernum", visible: false, render: "nullrender" },
					{ data: "name", name: "name", title: "İsim" },
					{ data: "synthname", name: "synthname", title: "Sentez No", orderDataType: "prodno"},
					{ data: "user.company", name: "user.company", title: "Şirket Adı" },
					{ data: "dmt", name: "dmt", title: "DMT", label: "dmt", type: "checkBox", def: false, render: "dmtrender" },
					{ data: "a260", name: "a260", title: "A260" },
					{ data: "tmbasic", name: "tmbasic", title: "Tm Basic" },
					{ data: "mw", name: "mw", title: "MW" },
					{ data: "conc", name: "conc", title: "Conc.(ng/ul)" },
					{ data: "totalng", name: "totalng", title: "Total ng" },
					{ data: "od", name: "od", title: "OD" },
					{ data: "totalnmol", name: "totalnmol", title: "Total nmol" },
					{ title: "Garanti Tekrar", render: "redoicon" },
					{ data: "synthid", name: "synthid", visible: false },
					{ data: "fmod", name: "fmod", visible: false, type: "hidden" },
					{ data: "orderid", name: "orderid", visible: false },
					{ data: "excoef", name: "excoef", visible: false },
					{ data: "gc", name: "gc", visible: false },
					{ data: "probe_fifth.val", name: "probe_fifth.id", visible: false },
					{ data: "probe_third.val", name: "probe_third.id", visible: false }
				]
			},
			editor: {
				allowed: ["id", "a260", "tmbasic", "mw", "conc", "totalng", "od", "totalnmol", "dmt", "synthid", "synthname","excoef","gc"],
				inline: {
					submit: "allIfChanged",
					onBlur: 'submit'
				},
				idSrc: 'id',
				localeditor: true, // lrep
			}
		}
	},
	modaltable: {
		type: "table",
		selector: "#modaltable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "probe",
				columns: ["id", "synthname", "name", "userid", "user.company", "sequence", "totalnmol", "repeat"],
				join: [
					{ table: "users", foreign: "userid", target: "userid" }
				]
			},
			oncreate: false,
			table: "ui celled table",
			datatable: {
				responsive: true,
				dom: '<"top">rt<"bottom"p><"clear">',
				columns: [{ data: "id", name: "id", visible: false, type: "hidden" },
				{ name: "synthname", data: "synthname", title: "Sentez No" },
				{ name: "user.company", data: "user.company", title: "Şirket" },
				{ name: "name", data: "name", title: "İsim" },
				{ data: "sequence", name: "sequence", title: "Sekans", render: "ellipsis" },
				{ data: "totalnmol", name: "totalnmol", title: "Total nmol" },
				{ data: "repeat", name: "repeat", title: "Tekrar" }
				]
			},
			editor: {
				allowed: ["id", "name"],
				inline: {
					submit: "allIfChanged"
				},
				idSrc: 'id'
			}
		}
	}
};


let productionoldwidgets = {
	container: {
		type: "container",
		selector: "#maincontainer",
		options: {
			div: "ui vertically divided content container",
			structure: [
				{ div: "ui large header", structure: [{ i: "file alternate icon" }, { div: "content", html: "Sentezler" }] },
				{ div: "ui divider" },
				{ div: "ui segment #oldsynthesestable" }
			]
		}
	},
	oldsynthesestable: {
		type: "table",
		selector: "#oldsynthesestable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "synth",
				columns: ["id", "name", "type",
					{ col: "a260", fn: "COUNT", as: "cnta260", table: "primer" },
					{ col: "id", fn: "COUNT", as: "cntall", table: "primer" },
					{ col: "a260", fn: "COUNT", as: "pcnta260", table: "probe" },
					{ col: "id", fn: "COUNT", as: "pcntall", table: "probe" }
				],
				join: [
					{ table: "primer", foreign: "id", columns: [], target: "synthid" },
					{ table: "probe", foreign: "id", columns: [], target: "synthid" }
				],
				group: ["synth.id"],
				order: ['synth.id DESC'],
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				lengthChange: true,
				responsive: true,
				select: true,
				order: [],
				columns: [
					{ data: "id", name: "id", visible: false },
					{ data: "name", name: "name", title: "Sentez Adı", render: "navigatesynth" },
					{ data: null, name: "cnta260", title: "A260 Girildi / Ürün Sayısı", render: "combineA260" },
					{ data: "type", name: "type", title: "Sentez Tipi", render: "type" },
					{ data: null, title: "Rapor", render: "docicon" }
				]
			}
		}
	}
};

let orderdashboarditems = {
	grid: {
		type: "container",
		selector: "#maincontainer",
		options: {
			div: "ui two column transition fade in grid",
			structure: [
				{
					div: "row", structure: [
						{
							div: "column", structure: [
								{
									div: "ui segments ingrid-top", structure: [
										{
											div: "ui secondary segment", structure: [
												{ h4: "noclass", html: "Son sipariş durumu" } //Last order status
											]
										},
										{ div: "ui  segment #lastorder" }
									]
								}
							]
						},
						{
							div: "column", structure: [
								{
									div: "ui segments ingrid-top", structure: [
										{
											div: "ui secondary segment", structure: [
												{ h4: "noclass", html: "Sentez programı" } //Synthesis Timetable
											]
										},
										{
											div: "ui  segment #schedtable", structure: [
												{ p: "noclass", html: "50bp'den kısa primerler için sentez programı" }, //Synthesis timetable for primers with less than 40bp
												{ div: "ui divider" }
											]
										},
										{ p: "noclass", html: "50 bp'den uzun 50 nmol primerler Salı günü saat 16:00'da senteze alınmaktadır" }
									]
								}
							]
						}
					]
				},
				{ div: "ui divider" },
				{
					div: "row", structure: [
						{
							div: "column", structure: [
								{
									div: "ui segments ingrid", structure: [
										{
											div: "ui secondary segment", structure: [
												{ h4: "noclass", html: "Primer fiyatları: Standart" } //Primer prices: standard
											]
										},
										{
											div: "ui  segment #pricetable", structure: [
												{ p: "noclass", html: "Skala ve Saflaştırmaya Göre Baz Başı Fiyatlar" }, //Price table by synthesis Scale and Purification, price is per base pair
												{ div: "ui divider" }
											]
										}
									]
								}
							]
						},
						{
							div: "column", structure: [
								{
									div: "ui segments ingrid", structure: [
										{
											div: "ui secondary segment", structure: [
												{ h4: "noclass", html: "Sipariş istatikleri" } // Order Stats
											]
										},
										{ div: "ui  segment #orderstable" }
									]
								}
							]
						}
					]
				},
			]
		}
	},
	lastorder: {
		type: "table",
		selector: "#lastorder",
		options: {
			datasource: "tableService",
			fetchparams: {
				table: "orders",
				columns: ["ordernum", "productsnum", "totalbp", "totalcost", "completed", "approval"],
				filter: {
					order: [["date", "DESC"]],
					limit: 1,
					where: {
						orderdone: true
					}
				}
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				responsive: true,
				dom: '<"top">rt<"bottom"><"clear">',
				columnDefs: [
					{ orderable: false, targets: ["_all"] }
				],
				columns: [{ data: "ordernum", title: "Sipariş no." },
				{ data: "productsnum", title: "Toplam ürün sayısı" },
				{ data: "totalbp", title: "Toplam BP" },
				{ data: "totalcost", title: "Toplam fiyat", render: "eur" },
				{ data: "completed", title: "% Tamamlanma", render: "pbar" },
				{ data: "approval", title: "Onay", render: "appr" }
				]
			}
		}
	},
	schedtable: {
		type: "table",
		selector: "#schedtable",
		options: {
			datasource: "tableAllService",
			hideempty: true,
			fetchparams: {
				table: "schedule",
				columns: ["mon", "tue", "wed", "thu", "fri"]
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				responsive: true,
				dom: '<"top">rt<"bottom"><"clear">',
				columnDefs: [
					{ orderable: false, targets: ["_all"] }
				],
				columns: [{ data: "mon", title: "Pazartesi", render: "sched" },
				{ data: "tue", title: "Salı", render: "sched" },
				{ data: "wed", title: "Çarşamba", render: "sched" },
				{ data: "thu", title: "Perşembe", render: "sched" },
				{ data: "fri", title: "Cuma", render: "sched" }]
			}
		}
	},
	pricetable: {
		type: "table",
		selector: "#pricetable",
		options: {
			datasource: "pricetable",
			oncreate: true,
			table: "ui celled table",
			datatable: {
				order: [],
				responsive: true,
				dom: '<"top">rt<"bottom"><"clear">',
				columnDefs: [
					{ orderable: false, targets: ["_all"] }
				],
				columns: [
					{ data: "scale", title: "Skala | Saflaştırma" },
					{ data: "c1", title: "Standard</br>Desalting", render: "eur" },
					{ data: "c2", title: "OPC", render: "eur" },
					{ data: "c3", title: "HPLC", render: "eur" }
				]
			}
		}
	},
	orderstable: {
		type: "table",
		selector: "#orderstable",
		options: {
			datasource: "tableService",
			fetchparams: {
				table: "orders",
				columns: ["ordernum", "type", "productsnum", "totalbp", "totalcost", "date", "shipmentdate"],
				filter: {
					order: [["date", "DESC"]],
					limit: 2,
					where: {
						orderdone: true
					}
				}
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				responsive: true,
				dom: '<"top">rt<"bottom"p><"clear">',
				columns: [{ data: "ordernum", title: "Sipariş no" },
				{ data: "type", title: "Tip" },
				{ data: "productsnum", title: "Toplam ürün sayısı" },
				{ data: "totalbp", title: "Toplam BP" },
				{ data: "totalcost", title: "Toplam fiyat", render: "eur" },
				{ data: "date", title: "Sipariş tarihi", render: "momentdate" },
				{ data: "shipmentdate", title: "Teslim tarihi" }
				]
			}
		}
	}
};

let tableServices = {
	tableService: {
		source: "ajax",
		url: "table"
	},
	editorService: {
		source: "ajax",
		url: "editor"
	},
	tableAllService: {
		source: "ajax",
		url: "tableAll"
	},
	updateTable: {
		source: "ajax",
		url: "updateTable"
	},
	pricetable: {
		source: "ajax",
		url: "pricetable"
	},
	extraservice: {
		source: "ajax",
		url: "extra"
	},
	synthService: {
		source: "ajax",
		url:"checksynth"
	}
};

let mailServices = {
	mailService: {
		source: "ajax",
		url: "mailer"
	},
	mailsenderservice: {
		source: "static",
		data: [
			{
				id: 1,
				val: "Sentebiolab"
			},

		]
	},
	seqmailsenderservice: {
		source: "static",
		data: [
			{
				id: 1,
				val: "Hatice B."
			},
		]
	},
}

let trackingServices = {
	trackingService: {
		source: "ajax",
		url: "setTracking"
	}
}

let tableFuncs = {
	redtext: (function(data){
		return "<h4 class= 'ui red header'>" + data + "</h4>";
	}).toString(),
	nulltracking:(function(data, type, row, meta){
		if(data === null) return "Takip No Yok";
		else {
			return data;
		}
	}).toString(),
	trackingset: (function(data, type, row, meta){
		if(data !== null) {
			return "<i class='large  green check circle icon'></i>";
		} else {
			return "<i class='large  red ban icon'></i>";
		}
	}).toString(),
	synthset: (function(data, type, row, meta){
		// TODO check repeat
		if(data !== null && data !== 0) {
			if(row.trackingid !== null) {
				return "<i class='large  red ban icon'></i>";
			} else {
				if (row.repeat === 0) {
					$("#" + meta.settings.sTableId).DataTable().row(meta.row).select();
					return "<i class='large  green check circle icon'></i>";
				}
				else {
					return "<i class='large  red ban icon'></i>";
				}
			}
		} else {
			if(row.trackingid !== null) {
				return "<i class='large  red ban icon'></i>";
			} else {
				return "<i class='large  red ban icon'></i>";
			}
		}
	}).toString(),

	fileorder: (function (data, type, row, meta) {

		let elm = $('<label class="mini basic ui button" for="excelupload' + row.userid + '"><i class="ui upload icon"></i><span class="noclass">Excel Yükle</span><input type="file" style="display: none" id="excelupload' + row.userid + '"></label>');

		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(elm);

		$(elm.children()[2]).xlsx({
			fileupload: true,
			map: [
				{
					'dtOrigin': 'A7',
					'dtTitleRow': ['A20', 'B20', 'C20', 'D20', 'E20', 'F20', 'G20']
				},
				{
					'dtOrigin': 'A7',
					'dtTitleRow': ['A20', 'B20', 'C20', 'D20', 'E20', 'F20', 'G20']
				}
			],
			uploadfunc: function (inp) {


				let ii;
				$.cookie("fatura", inp[7][5]);
				$.cookie("adres", inp[9][1]);
				$.cookie("proje", inp[9][5]);

				if(typeof(inp[5][5]) === "string") {
					let taxarr = inp[5][5].split("-");
					if(taxarr.length === 2) {
						$.cookie("daire", taxarr[0]);
						$.cookie("numara", taxarr[1]);
					} else {
						$.cookie("daire", inp[5][5]);
						$.cookie("numara", "");
					}
				}

				//console.log(inp);
				if (inp[0][0].includes("PRİMER") === true || inp[0][0].includes("PRIMER") === true) {
					console.log("primer");

					let validform = true;
					let msglist = [];

					let itemdata = [];
					for (ii = 14; ii < 1014; ii++) {

						if (inp[ii][0] === undefined) {
							break;
						}

						let tempobj = {};
						tempobj.name = inp[ii][0];

						let fmod = $.getWidget("fmodholder").query({ "val": inp[ii][1] });
						if (fmod.length) tempobj.fmod = fmod[0]["id"]; else tempobj.fmod = 0;

						let seqn = inp[ii][2];
						tempobj.sequence = seqn.toUpperCase().replace(/\n/g, '').replace(/\r/g, '').replace(/ /g,'');


						//sequence check here !!

						let tmod = $.getWidget("tmodholder").query({ "val": inp[ii][3] });
						if (tmod.length) tempobj.tmod = tmod[0]["id"]; else tempobj.tmod = 0;

						let sca = $.getWidget("scaholder").query({ "val": inp[ii][5] });
						if (sca.length) tempobj.scale = sca[0]["id"];
						else{ //tempobj.scale = 0;
							validform = false;
							if (msglist.length > 10) { msglist.push("......"); break;}
							else msglist.push("Skalası hatalı yada girilmemiş primer : " + tempobj.name);
						}

						if (inp[ii][6] === "Standart(DSLT)" || inp[ii][6] === "Standard(DSLT)") {console.log("Standart(DSLT)"); inp[ii][6] = "DSLT";}
						let puri = $.getWidget("puriholder").query({ "val": inp[ii][6] });
						if (puri.length) tempobj.purification = puri[0]["id"];
						else {//tempobj.purification = 0;
							validform = false;
							if (msglist.length > 10) {msglist.push("......"); break;}
							else msglist.push("Purifikasyonu hatalı yada girilmemiş primer : " + tempobj.name);
						}

						itemdata.push(tempobj);

					}

					if (validform) {

						$.formAction({ primers: itemdata, userId: row.userid }, "insertPrimer", function (res) {
							if (res.ok === "ok") {
								//$.cookie("tempvar", JSON.stringify(row));

								$.cookie("primuserid", row.userid);
								window.location.href = "/confirmuserprimer.html";
							}
						});
					} else {
						alert(msglist.join('\n'));
					}

				} else if (inp[0][0].includes("PROB") === true) {

					let pairs = $.getWidget("pairholder");

					let failedpairs = [];

					let itemdata = [];
					for (ii = 14; ii < 1014; ii++) {

						if (inp[ii][0] === undefined) {
							break;
						}

						let tempobj = {};
						tempobj.name = inp[ii][0];

						let fmod = $.getWidget("fmodholder2").query({ "val": inp[ii][1] });
						if (fmod.length) tempobj.fmod = fmod[0]["id"]; else tempobj.fmod = 0;

						let seqn = inp[ii][2];
						tempobj.sequence = seqn.toUpperCase().replace(/\n/g, '').replace(/ /g,'');

						let tmod = $.getWidget("tmodholder2").query({ "val": inp[ii][3] });
						if (tmod.length) tempobj.tmod = tmod[0]["id"]; else tempobj.tmod = 0;

						if (pairs.query({"fmodid":tempobj.fmod,"tmodid":tempobj.tmod}).length) itemdata.push(tempobj);
						else failedpairs.push(ii-13);
					}

					if (failedpairs.length === 0) {
						$.formAction({ probes: itemdata, userId: row.userid }, "insertProbe", function (res) {
							if (res.ok === "ok") {
								//$.cookie("tempvar", JSON.stringify(row));

								$.cookie("probuserid", row.userid);
								window.location.href = "/confirmuserprobe.html";
							}
						});
					} else {
						console.log(failedpairs)
						alert("Hatalı probe modifikasyon çiftleri mevcut : " + failedpairs.toLocaleString());
					}

				} else if (inp[0][0].includes("SEKANS") === true) {


					let itemdata = [];
					for (ii = 14; ii < 1014; ii++) {

						if (inp[ii][0] === undefined) {
							break;
						}
						let tempobj = {};
						tempobj.name = inp[ii][0];
						tempobj.cons = inp[ii][1];
						if (inp[ii][2] === "Sanger - PCR") { tempobj.seqtype = 1 }
						else if (inp[ii][2] === "Sanger - Plazmit") { tempobj.seqtype = 2 }
						else if (inp[ii][2] === "NextGen" || inp[ii][2] === "NextGen - Amplikon") { tempobj.seqtype = 3 }
						else if (inp[ii][2] === "NextGen - DeNovo") { tempobj.seqtype = 4 }
						tempobj.size = inp[ii][3];
						tempobj.pname = inp[ii][4];
						tempobj.pcons = inp[ii][5];
						tempobj.puri = null;
						if (inp[ii][6] === "Yapılsın") tempobj.puri = true;
						else if (inp[ii][6] === "Yapılmasın") tempobj.puri = false;

						itemdata.push(tempobj);
					}

					$.formAction({ seqs: itemdata, userId: row.userid }, "insertSeq", function (res) {
						if (res.ok === "ok") {
							//$.cookie("tempvar", JSON.stringify(row));

							$.cookie("sequserid", row.userid);
							window.location.href = "/confirmusersequence.html";
						}
					});

				}

			}
		});

		return null;

	}).toString(),
	orderscale: (function (data, type, row, meta) {
		if (data === 1) return "50 nmol";
		else if (data === 2) return "100 nmol";
		else if (data === 3) return "200 nmol";
		else return "-";
	}).toString(),
	inozinbtn: (function (data, type, row, meta) {
		if (row.sequence.includes("I")) {
			let elm = $("<div class= 'ui mini blue button'><i class='icon window restore outline'></i></div>").click(function () {

				$.getWidget("idt").set("");
				$('#inosineugod').text("");
				$('#inosinenmolod').text("");
				$('#inosineec').text("");
				$('#inosinemw').text("");
				$('#inosinemelttemp').text("");
				$('#inosinemelttemp').text("");
				$('#inosinegc').text("");
				$('#inosinebp').text("");

				$("#modid").attr("val", row.id).html("Id: " + row.id);
				$("#modsynthname").attr("val", row.synthname).html("Sentez No: " + row.synthname);
				$("#copyseq").attr("val", row.sequence);

				$.getWidget("mod").show();

			});
			$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(elm);
		}
		return null;
	}).toString(),
	itemno: (function (data, type, row, meta) {
		return (meta.row) + 1;
	}).toString(),
	pbar: (function (data) {
		return data ? "<div class='ui indicating inverted progress progressbar' data-percent='" + data * 100 + "'><div class='bar'><div class='progress'></div></div></div>" : "Beklemede";
	}).toString(),
	eur: (function (data) {
		return (data === null || data === 0 ? "Fiyat İsteyiniz" : data + "<i class='icon euro sign'></i>");
	}).toString(),
	appr: (function (data) {
		return "<i class='large " + (data ? " green check " : " hourglass half ") + "circle icon'></i>" + (data ? "Onaylandı" : "Beklemede");
	}).toString(),
	apprbtn: (function (data, type, row, meta) {

		let colattr = $("#" + meta.settings.sTableId).data("widget").options.datatable.columns[meta.col];
		let elm = $("<i class='large " + (data ? " green check " : " hourglass outline  ") + "circle icon'>").click(function () {
			$("#" + meta.settings.sTableId).DataTable().editor().edit($(this).closest('tr'), false).set(colattr.data, function () {
				let d = $("#" + meta.settings.sTableId).DataTable().editor().get(colattr.data);
				//TODO some logic to check if it is allowed to be unapproved
				// Send auto mail when approved
				if (d === "false") {
					$.formAction({ id: row.id, action: "autoMail", type: row.type, date: row.date, ordernum: row.ordernum, productsnum: row.productsnum, email: row.user.mail, mailtype: "approval" }, "mailService", function (res) {
						console.log("AUTO MAIL: ", res);
					});
				}
				return d !== "true";
			}()).submit(
				function(res) {
					console.log(res)
				},
				function(res) {
					console.log(res)
				}
			);
		});

		let elm2 = $("<i class='large trash icon'>").click(function () { // TO DO <-- check breakability soln: may want to refresh fater delete
			$.getWidget("prompt").fire("Silme uyarısı !", "Silinecek siparişte " + row.productsnum + " adet ürün bulunmaktadır.\n Siparişi silmek istediğinizden emin misiniz ?",
				function () {

					$.formAction({ orderid: row.id, type: row.type }, "deleteorderservice", function (resp) {
						if (resp.ok === "ok") {
							$.getWidget("orderlisttable").editor.remove([meta.row], false).submit(function (x) {
								console.log("ok");
								location.reload();
							}, function () {
								console.log("not ok");
							});
						} else {
							console.log("not ok");
						}
					})
				}
			)
		});
		let envelopecolor = "red";
		if(row.mailsent) envelopecolor = "green";
		let elm3 = $("<i class='ui large " + envelopecolor + " envelope outline circle icon'>");
		elm3.click(function () {
			$.getWidget('mailmodal').show();
			let email = row.user.mail;
			let name = row.user.name;
			let date = moment(row.date).format('YYYY-MM-DD HH:mm');
			let greeting = "Sayın " + name;
			//let content = "\'" + row.ordernum + "\' nolu siparişiniz alınmıştır."
			//+ "\nPazartesi günü senteze alınıp, Salı günü saat 16:00 itibarıyla hazır olacaktır." ;
			let content = "Siparişleriniz alınmıştır. Pazartesi günü senteze alınıp, Salı günü saat 16:00 itibarıyla hazır olacaktır.";


			$.getWidget('mailcontent').set(content);
			$.getWidget('mailheader').set(email);

			$("#mailtrbtn").click( function() {
				let content = "\'" + row.ordernum + "\' nolu siparişiniz alınmıştır."
				+ "\nPazartesi günü senteze alınıp, Salı günü saat 16:00 itibarıyla hazır olacaktır." ;
				$.getWidget('mailcontent').set(content);
				$(this).parent().parent().find(".header").html("E-posta Gönder");
			} );
			$("#mailenbtn").click( function() {
				let content = "Your order \'" + row.ordernum + "\' is received."
				+ "\nThe order is going to be synthesized on this Monday. It will be finished at 16:00 on this Tuesday." ;
				$.getWidget('mailcontent').set(content);
				$(this).parent().parent().find(".header").html("Send Email");
			} );

			$("#sendbutton").click(function () {
				$.getWidget('mailmodal').hide();
				let toSend = { action: "productionMail" };
				toSend["lang"] = "tr";
				toSend["tbl"] = row.type;
				toSend["orderid"] = row.id;
				toSend["content"] = $.getWidget('mailcontent').get();
				toSend["mailsender"] = $.getWidget('mailsender').semantic("get text");

				toSend["subject"] = "Üretim Bilgilendirme" ;
				toSend["header"] = date + " Tarihli Siparişiniz." ;
				toSend["greeting"] = greeting;

				toSend["email"] = $.getWidget('mailheader').get();
				toSend["name"] = name;
				toSend["date"] = row.date;
				toSend["ordernum"] = row.ordernum;
				toSend["productsnum"] = row.productsnum;
				//date: row.date, ordernum: row.ordernum, productsnum: row.productsnum,

				console.log("Diğer bilgiler: ", row );

				$.formAction(toSend, "mailService", function (res) {
					console.log(res);
					if (res.ok) {
						$("#" + meta.settings.sTableId).DataTable().editor().edit(elm3.closest('tr'), false)
							.set("mailsent", true).submit(function() {
								elm3.removeClass("red").addClass("green");
								window.location.reload();
							},function() {
								console.log("mail gitmedi");
								window.location.reload();
							});
					}
				});
			});
		});
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(elm);
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).append(elm2);
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).append(elm3);

		// Register handlers to EN/TR buttons

		return null;
	}).toString(),
	genebtn: (function (data, type, row, meta) {
		let colattr = $("#" + meta.settings.sTableId).data("widget").options.datatable.columns[meta.col];

		let elm = $('<label class="mini basic ui button"><i class="ui check icon"></i><span class="noclass">Tamamla</span></label>');
		elm.click(function () {
			$("#" + meta.settings.sTableId).DataTable().editor().edit($(this).closest('tr'), false).set(colattr.data, function () {
				let d = $("#" + meta.settings.sTableId).DataTable().editor().get(colattr.data);
				//TODO some logic to check if it is allowed to be unapproved
				// Send auto mail when approved
				if (d === "false") {
					//calculate order completed percentage here TO DO


				}
				return d !== "true";
			}()).submit(
				function () {
					$.formAction({orderid: row.orderid, geneid: row.id}, "completegeneservice", function(data) {
						location.reload();
					})
				}, function() {
					console.log("not ok");
					//handle error
				}
			);

		});
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(elm);
		return null;
	}).toString(),
	mailbtn: (function (data, type, row, meta) {
		let colattr = $("#" + meta.settings.sTableId).data("widget").options.datatable.columns[meta.col];
		let elm = $("<i class=' envelope outline circle icon'>").click(function () {
			$.getWidget('mailmodal').show();
			let email = row.user.mail;
			let name = row.user.name;
			let content = "Sayın " + name + "\n\n'" + row.ordernum + "' nolu siparişiniz onaylanmıştır.";

			$.getWidget('mailcontent').set(content);
			$.getWidget('mailheader').set(email);

			$("#sendbutton").click(function () {
				$.getWidget('mailmodal').hide();
				let toSend = { action: "productionMail" };

				toSend["content"] = $.getWidget('mailcontent').get();
				toSend["email"] = $.getWidget('mailheader').get();
				toSend["name"] = name;

				$.formAction(toSend, "mailService", function (res) {
					if (res.ok === true) {
						window.location.reload();
					}
				});
			});
		});
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(elm);
		return null;
	}).toString(),
	sched: (function (data) {
		if (!data) return "";
		let fields = data.split(',');
		let color = "grey";
		if (parseInt(fields[1]) >= 100) color = "blue";
		if (parseInt(fields[1]) >= 200) color = "green";
		return "<div class='center aligned'>" + fields[0] + "</br><div class='ui " + color + " horizontal label'>" + fields[1] + "</div></div>"
	}).toString(),
	link: (function (data, type, row, meta) { //set #reportbutton to show correct report
		let link = $(document.createElement("a")).addClass("tablecontent").css('cursor', 'pointer').css("text-decoration", "none").html(data).click(function (e) {
			if (row.type === undefined) {
				let arr = []; arr.push(row.id);
				$.getWidget('modal').show(arr);
			} else {
				if (row.type === "primer") {
					let arr = []; arr.push(row.id);
					if ($("#reportbutton").length) {
						$("#reportbutton").show();
						$("#reportbutton").unbind("click");
						$("#reportbutton").click(function () {
							$.getWidget("reportmodal").show(arr, ["reporttableprobe"]);
						})
					}
					$.getWidget('modal').show(arr, ["probetable", "seqtable", "genetable"]);
				} else if (row.type === "probe") {
					let arr = []; arr.push(row.id);
					if ($("#reportbutton").length) {
						$("#reportbutton").show();
						$("#reportbutton").unbind("click");
						$("#reportbutton").click(function () {
							$.getWidget("reportmodal").show(arr, ["reporttable"]);
						})
					}
					$.getWidget('modal').show(arr, ["modaltable", "seqtable", "genetable"]);
				} else if (row.type === "sequence") {
					let arr = []; arr.push(row.id);
					if ($("#reportbutton").length) {
						$("#reportbutton").hide();
						$("#reportbutton").unbind("click");
					}
					$.getWidget('modal').show(arr, ["modaltable", "probetable", "genetable"]);
				} else if (row.type === "gene") {
					let arr = []; arr.push(row.id);
					if ($("#reportbutton").length) {
						$("#reportbutton").hide();
						$("#reportbutton").unbind("click");
					}
					$.getWidget('modal').show(arr, ["modaltable", "probetable", "seqtable"]);
				}
			}
		});
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(link);
		return null;
	}).toString(),
	podlink: (function (data, type, row, meta) {
		let elm = $(document.createElement("a")).addClass("item").css('cursor', 'pointer').html(data);
		elm.click(function () {
			$.cookie("tempvar", JSON.stringify(row));
			window.location.href = "productionOrderDetails.html";
		});
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(elm);
		return data;
	}).toString(),
	ellipsis: (function (data, type, row, meta) {
		if (!data) return "";

		if ($.type(data) === "object") { data = data.sequence; }
		let shortened = data.substr(0, 30);
		if (shortened.length > 29) shortened += "&#8230";
		let spliced = "", offset = 0, len = data.length / 30;
		for (let i = 0; i < len; i++) {
			offset = i * 30;
			spliced += data.substring(offset, offset + 30) + " ";
		}
		let elm = $(document.createElement("div")).addClass("ellipsis").attr("data-content", spliced).attr("data-variation", "wide").css("background-color", (data.includes("I") ? "#f2dede" : "ffffff")).html(shortened).hover(function (e) {
			$(e.target).popup("show");
		}).popup();
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(elm);
		return null;
	}).toString(),
	ellipsis2: (function (data, type, row, meta) {
		if (!data) return "";

		if (data.length <= 10) return data;
		let shortened = data.substr(0, Number(10));
		shortened += "&#8230";
		let elm = $(document.createElement("div")).html(shortened);
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(elm);
		return null;
	}).toString(),
	ellipsis3: (function (data, type, row, meta) {
		if (!data) return "";

		let shortened = data;
		if (data.length > 10) {
			shortened = data.substr(0, Number(10));
			shortened += "&#8230";
		}

		let spliced = "", offset = 0, len = data.length / Number(3);
		for (let i = 0; i < len; i++) {
			offset = i * Number(3);
			spliced += data.substring(offset, offset + Number(3)) + " ";
		}

		let elmfull = $(document.createElement("div")).addClass("transition hidden").css("background-color", (data.includes("I") ? "#f2dede" : "ffffff")).css("margin-top", "10px").html(spliced);
		let elm = $(document.createElement("div")).html(shortened).css("background-color", (data.includes("I") ? "#f2dede" : "ffffff")).css("color", "#337ab7").on("click", function (e) {
			elmfull.transition('slide down');
		})
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(elm);
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).append(elmfull);
		return null;

	}).toString(),
	checkdata: (function (data) {
		if (data) return data;
		else return " ";
	}).toString(),
	momentdate: (function (data) {
		moment.locale('tr');
		return moment(data).format('YYYY-MM-DD HH:mm');//moment(data).format('HH:mm D MMM YY');
	}).toString(),
	getbp: (function (data) {
		if ($.type(data) === "object") data = data.sequence;
		return data.length; //TODO calculate for multi-pair symbols
	}).toString(),
	getbpred: (function (data, type, row, meta) {
		if ($.type(data) === "object") {
			data = data.sequence;
		}
		if (data.length >= 50) {
			$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).addClass("redbp");
		}
		return data.length; //TODO calculate for multi-pair symbols
	}).toString(),
	docicon: (function (data, type, row) { // TODO
		return '<div class="ui label" style="cursor: pointer;" onclick="$.getFunction(\'aclick\')(' + row.id + ",\'" + row.type + '\')" href=""><i class="file alternate icon"></i> Rapor Oluştur</div>';
	}).toString(),
	aclick: (function (id, type) { // TODO
		$.cookie("report", JSON.stringify({ "id": id, "type": type }));
		if (type === "primer") window.location.href = "productionSynthReport.html";
		else if (type === "probe") window.location.href = "productionSynthReportProbe.html";
	}).toString(),
	redoicon: (function (data, type, row, meta) {

		if($($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).html() !== "") {
			return null;
		}

		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node())

		if (row.repeat>0) {
			$.getWidget('reporttable').table.DataTable().row([meta.row]).select()
		}

		elm = $('<i class="redo link icon"></i>').on("click", function () {
			let self = $.getWidget('reporttable').table.DataTable().row([meta.row]);
			let selindexes = $.getWidget("reporttable").datatable.rows({ selected: true }).indexes().toArray()
			if (selindexes.includes(self.index())) {
				self.deselect();
			} else {
				self.select();
			}
		});
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(elm);
		return null;
	}).toString(),
	combineA260: (function (data) {
		if (data.pcntall > 0) return data.pcnta260 + " / " + data.pcntall;
		else return data.cnta260 + " / " + data.cntall;
	}).toString(),
	nullrender: (function (data) { if (data === null) return " - "; else return data; }).toString(),
	navigatesynth: (function (data, type, row, meta) {
		let link = $(document.createElement("a")).addClass("tablecontent").css('cursor', 'pointer').html(data).click(function (e) {
			$.cookie("tempvarsynth", JSON.stringify({id: row.id}));
			if (row.type === "primer") window.location.href = "productionSynthesis.html";
			else if (row.type === "probe") window.location.href = "productionSynthesisProbe.html";
		});
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(link);
		return data;
	}).toString(),
	navigateorder: (function (data, type, row, meta) {
		if (row.orderid !==0) {
			let link = $(document.createElement("a")).addClass("tablecontent").css('cursor', 'pointer').html(data).click(function (e) {
				if (window.location.pathname === "/productionSynthesis.html") $.cookie("tempvar", JSON.stringify(row.order));
				else if (window.location.pathname === "/productionSynthesisProbe.html") $.cookie("tempvar", JSON.stringify(row.order));
				else if (window.location.pathname === "/productionGene.html") $.cookie("tempvar", JSON.stringify(row.order));
				window.location.href = "productionOrderDetails.html";
			});
			$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(link);
		}
		return data;
	}).toString(),
	pstate: (function (data, type, row) { // TODO

		if (row.tracking === null) {
			if (data === null) return "Beklemede";
			else if (Number(data) === 0) return "Beklemede";
			else if (Number(data) > 0) return "Sentezde";
		} else {
			return "Kargoda...<i class='truck icon'></i>";
		}
	}).toString(),
	seqpuri: (function (data, type, row) { // TODO
		if (data === true) return "✓ Yapılsın";
		else return "✘ Yapılmasın";
	}).toString(),
	dmtrender: (function (data, type, row) { // TODO
		if (data === true) return "DMTON";
		else return "DMTOFF";
	}).toString(),
	dmtrender2: (function (data, type, row) { // TODO
		if (data === true) return "ON";
		else return "OFF";
	}).toString(),
	type: (function (data, type, row) {
		if (data === "primer") {
			return "<div><i style='color: cornflowerblue;' class='snowflake outline icon'></i>Primer</div>";
		} else if (data === "probe") {
			return "<div><i style='color: orange;' class='star icon'></i>Probe</div>";
		} else if (data === "sequence") {
			return "<div><i style='color: green;' class='dna icon'></i>Sekans</div>";
		} else if (data === "gene") {
			return "<div><i style='color: red;' class='dna icon'></i>Gen</div>";
		} else {
			return data;
		}
	}).toString(),
	orderlistlink: (function (data, type, row, meta) {
		let elm = $(document.createElement("a")).addClass("item").css('cursor', 'pointer').html(data);
		elm.click(function () {
			$.cookie("cid", JSON.stringify(row.userid));
			window.location.href = "viewOrderList.html";
		});
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(elm);
		return data;
	}).toString(),
	orderdetailslink: (function (data, type, row, meta) {

		let elm = $(document.createElement("a")).addClass("item").css('cursor', 'pointer').html(data);
		elm.click(function () {
			$.cookie("tempvar", JSON.stringify(row));
			window.location.href = "productionOrderDetails.html";
		});
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(elm);
		return data;
	}).toString(),
	linkcustomer: (function(data, type, row, meta) {
		let link = $(document.createElement("a")).addClass("tablecontent").css('cursor', 'pointer').css("text-decoration", "none").html(row.company + " - " + row.name).click(function (e) {
			let arr = []; arr.push(row.id);
			$.getWidget("modal").show(arr);
		});
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(link);
		return data;
	}).toString(),
	pagelinkcustomer: (function(data, type, row, meta) {
		let link = $(document.createElement("a")).addClass("tablecontent").css('cursor', 'pointer').css("text-decoration", "none").html(row.company + " - " + row.name).click(function (e) {
			$.cookie("customerid", JSON.stringify(row.userid));
			window.location.href = "customeredit.html";
		});
		$($("#" + meta.settings.sTableId).DataTable().cell(meta.row, meta.col).node()).empty().append(link);
		return data;
	}).toString(),
	/*
	reportname: (function (data, type, row) { // TODO
		if (data === null) return "Kontrol";
		else return data;
	}).toString(),*/
	/*
	renderCBox: (function ( data, type, row ) {
		if ( type === 'display' ) {
			return '<input type="checkbox" class="editor-active">';
		}
		return data;
	}).toString(),
	*/
	/*
	rowCallback: (function ( row, data ) {
		console.log(row);
		console.log(data);
		//$('input.mycheckbox', row).prop('checked', data.mycheckbox === true);
		$('input.editor-active', row).prop('checked', data['dmt'] === true);
	}).toString(),
	*/
};

let ordernavbarservices = {
	orderdropdownservice: {
		source: "static",
		data: [
			{
				link: "primer.html",
				id: 1,
				img: {
					src: "assets/images/primer.png"
				},
				val: "Primer"
			},
			{
				link: "probe.html",
				id: 2,
				img: {
					src: "assets/images/probe.png"
				},
				val: "Probe"
			},
			{
				link: "sequence.html",
				id: 3,
				img: {
					src: "assets/images/sequence.svg"
				},
				val: "Sequence"
			},
			{
				link: "gene.html",
				id: 4,
				icon: "red dna icon",
				val: "Gen"
			}
		]
	},
	userdropdownservice: {
		source: "static",
		data: [
			{
				link: "customer.html",
				id: 1,
				icon: "address card icon",
				val: "Müşteri Bilgileri"
			},
			{
				link: "password.html",
				id: 2,
				icon: "lock icon",
				val: "Şifre Değiştir"
			},
			{
				func: "logout",
				id: 3,
				icon: "logout icon",
				val: "Güvenli Çıkış"
			}
		]
	},
	langdropdownservice: {
		source: "static",
		data: [
			{
				id: 1,
				img: {
					src: "assets/images/turkish.png"
				},
				val: "TR",
				func: "translate_TR"
			},
			/*
			{
				id: 2,
				img: {
					src: "assets/images/british.png"
				},
				val: "EN",
				func: "translate_EN"
			}*/
		]
	}
};

let seqproductionnavbarservices = {
	userdropdownservice: {
		source: "static",
		data: [
			{
				link: "password.html",
				id: 1,
				icon: "lock icon",
				val: "Şifre Değiştir"
			},
			{
				func: "logout",
				id: 2,
				icon: "logout icon",
				val: "Güvenli Çıkış"
			}
		]
	},
	pooldropdownservice: {
		source: "static",
		data: [
			{
				link: "productionGene.html",
				id: 1,
				icon: "red dna icon",
				val: "Gen Sentezi"
			}
		]
	},
	ekdropdownservice: {
		source: "static",
		data: [
			{
				link: "addCustomer.html",
				id: 1,
				icon: "address card icon",
				val: "Müşteri Ekle"
			},
			{
				link: "viewCustomerList.html",
				id: 2,
				icon: "users icon",
				val: "Müşteriler"
			},/*
			{
				link: "customerReport.html",
				id: 3,
				icon: "chart bar icon",
				val: "Müşteri Raporu"
			},
			{
				link: "synthstats.html",
				id: 4,
				icon: "chart bar icon",
				val: "Sentez Raporu"
			},*/
		]
	},
};

let productionnavbarservices = {
	synthesesdropdownservice: {
		source: "static",
		data: [
			{
				link: "productionSynthList.html",
				id: 1,
				img: {
					src: "assets/images/primer.png"
				},
				val: "Primer"
			},
			{
				link: "productionSynthListProbe.html",
				id: 2,
				img: {
					src: "assets/images/probe.png"
				},
				val: "Probe"
			},
		]
	},
	pooldropdownservice: {
		source: "static",
		data: [
			{
				link: "productionPrimerPool.html",
				id: 1,
				img: {
					src: "assets/images/primer.png"
				},
				val: "Primer"
			},
			{
				link: "productionProbePool.html",
				id: 2,
				img: {
					src: "assets/images/probe.png"
				},
				val: "Probe"
			}
		]
	},
	userdropdownservice: {
		source: "static",
		data: [
			{
				link: "password.html",
				id: 1,
				icon: "lock icon",
				val: "Şifre Değiştir"
			},
			{
				func: "logout",
				id: 2,
				icon: "logout icon",
				val: "Güvenli Çıkış"
			}
		]
	},
	ekdropdownservice: {
		source: "static",
		data: [
			{
				link: "addCustomer.html",
				id: 1,
				icon: "address card icon",
				val: "Müşteri Ekle"
			},
			{
				link: "viewCustomerList.html",
				id: 2,
				icon: "users icon",
				val: "Müşteriler"
			},
			{
				link: "customerReport.html",
				id: 3,
				icon: "chart bar icon",
				val: "Müşteri Raporu"
			},
			{
				link: "synthstats.html",
				id: 4,
				icon: "chart bar icon",
				val: "Sentez Raporu"
			},
		]
	},
};

let productionFuncs = {
	boxprint: (function (data) {

		let table_data_w_k = $.getWidget('reporttable')
			.getCols([
				{ name: "user.company", render: false },
				{ name: "name", render: false },
				{ name: "order.ordernum", render: false },
				{ name: "orderid", render: false }
			]);
			let order = $.getWidget('reporttable').table.DataTable().rows({ order: 'applied' } )[0];
			let table_data = [];
			$.each(order, function(i,v){
				if(table_data_w_k[v]["order.ordernum"] !=="Kontrol") {
					table_data.push(table_data_w_k[v]);
				}
			});

			let toprint = table_data.reduce(function (h, obj) {
				h[obj.orderid] = (h[obj.orderid] || []).concat(obj); //"i"+
				return h;
			}, {});

			console.log(toprint)

			let toprintreborn = [];
			$.each(toprint, function(i,v){
				if(v.length > 6) {
					let ii,jj;
					for (ii=0,jj=v.length; ii<jj; ii+=6) {
							toprintreborn.push(v.slice(ii,ii+6));
					}
				} else toprintreborn.push(v);
			});

		let divs = $('<div>');
		$.each(toprintreborn, function (i, val) {
			let div = $('<div>').addClass('singlereport');
			let span = $('<span>').addClass('rhead').html(val[0]['user.company']);
			let div2 = $('<div>').attr('style', "margin: 0 !important; border-top: 1px solid;");

			let div3 = $('<div>').attr('style', "margin-top: 0.1em;");

			$.each(val, function (j, v) {
				let span = $('<span>').addClass('itemLine').html(v['order.ordernum']);
				let span2 = $('<span>').addClass('primerName').html(v['name']);
				span.append(span2, ['<button class="rmsingleprimer hidePrint"></button>']);
				div3.append(span, ['<br>']);
			});

			div.append(span,$('<button></button>').addClass("removeItem hidePrint"),['<br>', div2, div3]);
			divs.append(div);
		});
		console.log("DIVS: ", divs.html());

		let my_window = window.open('', 'Dokuman', 'status=1,width=1000,height=800');

		my_window.document.open();
		my_window.document.write('<html lang=""><head><link rel="stylesheet" href="./css/print-box.css"><script src="./jquery/jquery-3.3.1.js"></script><title></title></head>' +
			'<body onload="window.print()">' + divs.html() + '</body><script src="./js/printbox.js"></script></html>');
		my_window.document.close();
	}).toString(),
	boxprintz: (function (data) {
		let table_data_w_k = $.getWidget('reporttable')
			.getCols([
				{ name: "user.company", render: false },
				{ name: "name", render: false },
				{ name: "order.ordernum", render: false },
				{ name: "orderid", render: false },
				{ name: "synthname", render: false }
			]);

			let order = $.getWidget('reporttable').table.DataTable().rows({ order: 'applied' } )[0];
			let table_data = [];
			$.each(order, function(i,v){
				if(table_data_w_k[v]["order.ordernum"] !=="Kontrol") {
					table_data.push(table_data_w_k[v]);
				}
			});


		let toprint = table_data.reduce(function (h, obj) {
			h["i"+obj.orderid] = (h["i"+obj.orderid] || []).concat(obj);
			return h;
		}, {});

		console.log(table_data);
		console.log(toprint)

		let toprintreborn = [];
			$.each(toprint, function(i,v){
				if(v.length > 6) {
					let ii,jj;
					for (ii=0,jj=v.length; ii<jj; ii+=6) {
							toprintreborn.push(v.slice(ii,ii+6));
					}
				} else toprintreborn.push(v);
			});

		let divs = $('<div>');
		$.each(toprintreborn, function (i, val) {
			let div = $('<div>').addClass('singlereport kutuPage');
			//let span = $('<span>').addClass('rhead').html(val[0]['user.company']);
			let span22 = $('<span>').addClass('rhead').html(val[0]['order.ordernum']);
			let div2 = $('<div>').addClass('rhead_border');

			let div3 = $('<div>').attr('style', "margin-top: 0.1em;");

			$.each(val, function (j, v) {
				let span = $('<span>').addClass('itemLine').html(v['synthname']);
				let span2 = $('<span>').addClass('primerName').html(v['name']);
				span.append(span2).append($('<button></button>').addClass("rmsingleprimer hidePrint"));
				div3.append(span, ['<br>']);
			});

			div.append(/*span,*/ span22, $('<button></button>').addClass("removeItem hidePrint"),['<br>', div2, div3]);
			divs.append(div);
		});
		console.log("DIVS: ", divs.html());

		let my_window = window.open('', 'Dokuman', 'status=1,width=1000,height=800');

		my_window.document.open();
		my_window.document.write('<html><head><link rel="stylesheet" href="./css/print-boxzebra.css"><link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">'
				+ '<link href="./css/contentblah.css" rel="stylesheet"/><script src="./js/modernizr.js"></script><script src="./jquery/jquery-3.3.1.js"></script></head>' +
			'<body onload="window.print()">' + divs.html() + '</body><script src="./js/printbox.js"></script></html>');
		my_window.document.close();
	}).toString(),
	tubeprint: (function (data) {
		let toprint = $.getWidget('reporttable')
			.getCols([
				{ name: "user.company", render: false },
				{ name: "name", render: false },
				{ name: "sequence", render: false },
				{ name: "scale", render: false },
				{ name: "tmbasic", render: false },
				{ name: "mw", render: false },
				{ name: "synthname", render: false },
				{ name: "bp", render: false }
			]);
		let order = $.getWidget('reporttable').table.DataTable().rows({ order: 'applied' } )[0];
		let divs = $('<div>');
		$.each(order, function (i, v) {
			let seq1, seq2, val;
			val = toprint[v];
			if (val['sequence'].length > 20) {
				seq1 = val['sequence'].substring(0, 20);
				seq2 = val['sequence'].substring(20);
			} else {
				seq1 = val['sequence'];
				seq2 = null;
			}
			let div = $('<div>').addClass('singlereport');
			let innerDiv = $('<div>').addClass('reportcontent');
			let div2 = $('<span>').addClass('compname').html(val['synthname'] + ' ' + val['sequence'].length + 'bp');
			let span = $('<span>').addClass('reportname').html(val['name'].replace(/\r?\n|\r/g,''));
			let span2 = $('<span>').addClass('reportdata').html(seq1);
			let span3 = $('<span>').addClass('reportdata2').html(seq2);
			let img = $('<img>').addClass('hideView').attr('src', './Images/logo-white.png');
			let mw = $('<div>').addClass('mw').html("MW:" + val['mw']);
			let tmbasic = $('<div>').addClass('tmbasic').html("TM:" + val['tmbasic']);

			div.append(innerDiv).append(span).append('<br>').append(div2).append('<br>').append(span2).append('<br>').append(span3).append('<br>').append(tmbasic).append(mw).append('<br>').append(img);

			divs.append(div);
		});
		console.log("DIVS: ", divs);

		let my_window = window.open('', 'Dokuman', 'status=1,width=1000,height=800');

		my_window.document.open();
		my_window.document.write('<html><head><link rel="stylesheet" href="./css/print-tube.css"></head>' +
			'<body onload="window.print()">' + divs.html() + '</body></html>');
		my_window.document.close();
	}).toString(),
	tubeprintIntergen: (function (data) {
		let toprint = $.getWidget('reporttable')
			.getCols([
				{ name: "user.company", render: false },
				{ name: "name", render: false },
				{ name: "sequence", render: false },
				{ name: "scale", render: false },
				{ name: "tmbasic", render: false },
				{ name: "mw", render: false },
				{ name: "synthname", render: false },
				{ name: "bp", render: false },
				{ name: "totalnmol" }
			]);
		let order = $.getWidget('reporttable').table.DataTable().rows({ order: 'applied' } )[0];
		let divs = $('<div>');
		$.each(order, function (i, v) {
			let seq1, seq2, val;
			val = toprint[v];
			if (val['sequence'].length > 20) {
				seq1 = val['sequence'].substring(0, 20);
				seq2 = val['sequence'].substring(20);
			} else {
				seq1 = val['sequence'];
				seq2 = null;
			}
			let div = $('<div>').addClass('singlereport');
			let innerDiv = $('<div>').addClass('reportcontent');
			let div2 = $('<span>').addClass('compname').html(val['synthname'] + ' ' + val['sequence'].length + 'bp');
			let span = $('<span>').addClass('reportname').html(val['name'].replace(/\r?\n|\r/g,''));
			let span2 = $('<span>').addClass('reportdata').html(seq1);
			let span3 = $('<span>').addClass('reportdata2').html(seq2);
			let span4 = $('<span>').addClass('nmol').html('nmol: ' + val['totalnmol']);
			let img = $('<img>').addClass('hideView').attr('src', './Images/logo-white.png');
			let mw = $('<div>').addClass('mw').html("MW:" + val['mw']);
			let tmbasic = $('<div>').addClass('tmbasic').html("TM:" + val['tmbasic']);
			div.append(innerDiv).append(span).append('<br>').append(div2).append('<br>').append(span2).append('<br>').append(span3).append('<br>').append(span4).append('<br>').append(tmbasic).append(mw).append('<br>').append(img);

			divs.append(div);
		});
		console.log("DIVS: ", divs);

		let my_window = window.open('', 'Dokuman', 'status=1,width=1000,height=800');

		my_window.document.open();
		my_window.document.write('<html><head><link rel="stylesheet" href="./css/print-tube.css"></head>' +
			'<body onload="window.print()">' + divs.html() + '</body></html>');
		my_window.document.close();
	}).toString(),
		print6: (function(){
			let unorderedtoprint = [];

			let printtype = JSON.parse($.cookie("report"))["type"];
			if(printtype === "primer") {
				let unorderedtoprint = $.getWidget('reporttable')
				.getCols([
					{ name: "order.ordernum" },
					{ name: "sequence" },
					{ name: "dmt" },
					{ name: "synthname" },
					{ name: "name" },
					{ name: "primer_sca.id" }, //CURPOS
					{ name: "primer_puri.id" },
					{ name: "tmbasic" },
					{ name: "gc" },        // (_G + _C) / sequence.length
					{ name: "bp" },        // sequence.length
					{ name: "mw" },
					{ name: "excoef" },    //
					{ name: "nmoleod" },   // totalnmol / od
					{ name: "ugod" },      // totalng/(1000*od)
					{ name: "conc" },
					{ name: "a260" },
					{ name: "totalng" },
					{ name: "od" },
					{ name: "totalnmol" },
					{ name: "stok100ulte" },  //
					{ name: "stok50ulte" },    //
					{ name: "primer_fifth.id"},
					{ name: "primer_third.id"},

					// Other data for classifying the report
					{ name: "orderid" },
					{ name: "user.company" }
				]);

				$.each(unorderedtoprint,function(ritp,rvtp) {

					rvtp["bp"] = rvtp["sequence"].length;

					let tmp = "";
					for (let t = 0; t < rvtp["sequence"].length; t++) {
						if (t > 0 && t % 3 === 0) {
							tmp += " ";
						}
						tmp += rvtp["sequence"][t];
					}

					if (rvtp["primer_fifth.id"]!=="" && rvtp["primer_fifth.id"]!== undefined) rvtp["sequence"] = rvtp["primer_fifth.id"] + "-" + tmp;
					else rvtp["sequence"] = tmp;
					if (rvtp["primer_third.id"]!=="" && rvtp["primer_third.id"]!== undefined) rvtp["sequence"] = rvtp["sequence"] + "-" + rvtp["primer_third.id"];
				});

			}
			else if(printtype === "probe") {
				let unorderedtoprint = $.getWidget('reporttable')
				.getCols([
					{ name: "order.ordernum" },
					{ name: "sequence" },
					{ name: "dmt" },
					{ name: "synthname" },
					{ name: "name" },
					{ name: "tmbasic" },
					{ name: "gc" },        // (_G + _C) / sequence.length
					{ name: "bp" },        // sequence.length
					{ name: "mw" },
					{ name: "excoef" },    //
					{ name: "nmoleod" },   // totalnmol / od
					{ name: "ugod" },      // totalng/(1000*od)
					{ name: "conc" },
					{ name: "a260" },
					{ name: "totalng" },
					{ name: "od" },
					{ name: "totalnmol" },
					{ name: "stok100ulte" },  //
					{ name: "stok50ulte" },    //
					{ name: "probe_fifth.id"},
					{ name: "probe_third.id"},
					// Other data for classifying the report
					{ name: "orderid" },
					{ name: "user.company" }
				]);



				$.each(unorderedtoprint,function(ritp,rvtp) {
					rvtp["primer_sca.id"] = "200";
					rvtp["primer_puri.id"] = "HPLC";

					rvtp["bp"] = rvtp["sequence"].length;

					let tmp = "";
					for (let t = 0; t < rvtp["sequence"].length; t++) {
						if (t > 0 && t % 3 === 0) {
							tmp += " ";
						}
						tmp += rvtp["sequence"][t];
					}
					rvtp["sequence"] = tmp;

					rvtp["sequence"] = rvtp["probe_fifth.id"] + "-" + rvtp["sequence"] + "-" + rvtp["probe_third.id"]
				});

			}

			let toprint = [];

			let order = $.getWidget('reporttable').table.DataTable().rows({ order: 'applied' } )[0];
			$.each(order,function(rit,rvt) {
				toprint.push( unorderedtoprint[rvt] );
			});


			let group6 = {};
			$.each(toprint,function(i,v){
				let newOligo = v;
				if(!group6[v["order.ordernum"]]) {
					group6[v["order.ordernum"]] = [[]];
				}
				if(group6[v["order.ordernum"]][group6[v["order.ordernum"]].length -1].length === 6) {
					group6[v["order.ordernum"]].push([]);
				}
				group6[v["order.ordernum"]][group6[v["order.ordernum"]].length -1].push(newOligo);
			});

			function createPage6(el, comp, date) {
				let pageContent = $("<div></div>").addClass("page-content").css({"word-wrap":"break-word","width": "100%","max-width": "800px"}).appendTo(el);
				let outerTable = $("<table></table>").addClass("table main-table").attr("cellspacing","0").css({"border":"none"}).appendTo(pageContent);
				let outerThead = $("<thead></thead>").css({"margin":"0 !important","padding": "0 !important","border": "none"}).appendTo(outerTable);
				$("<tr></tr>").css({"margin":"0 !important","padding": "0 !important","border": "none"}).appendTo(outerTable).append(
					$("<td></td>").css({"margin":"0 !important","padding": "0 !important","border": "none"}).append(

						$("<table></table>").append($("<tr></tr>")
							.append(
								$("<td></td>").addClass("imgtaraf").append(
									$("<img></img>").attr("src","./Images/Sentebiolab-logo.png").attr("height","150").attr("width","100%").addClass("sentegenlogo")))
							.append(
								$("<td></td>").addClass("yantaraf").append($("<strong>Sentebiolab </strong>").addClass("yantarafsirket"))
									.append($("<p>Cyberparkplaza C Blok  No: 1B7</p>").addClass("yantarafadres"))
									.append($("<p>Bilkent, Çankaya,  Ankara, Turkey</p>").addClass("yantarafadres"))
									.append($("<p>T: +90 312 265 00 20  F: +90 312 265 06 63</p>").addClass("yantarafadres"))
									.append($("<p>www.sentebiolab.com.tr</p>").addClass("yantaraflink"))
							)
						)
					)
				);
				let outerTbody = $("<tbody></tbody>").css({"border": "none"}).appendTo(outerTable);
				let mainTr = $("<tr></tr>").css({"border":"none"}).appendTo(outerTbody);
				let mainTd = $("<td></td>").addClass("single-paper").css({"padding-left": "1cm","padding-right": "1cm"}).appendTo(mainTr);
				let h4 = $("<h4></h4>").html("Sentez Raporu: <span class='itemCompanyName'>" + comp + "</span><span style='float: right'>Sentez Tarihi - " + date).appendTo(mainTd);
				let headerInput = $("<input/>").addClass("editCompanyName hidePrint").val(comp).appendTo(mainTd);
				mainTd.append($("<hr/>").css({"padding-top":"0", "padding-bottom": "0", "margin-bottom": "0", "color":"#222222"}));
				let footTd = $("<td></td>").css({"padding-left": "1cm", "padding-right": "1cm"}).html("<h5>Primer Kullanım Kılavuzu:</h5> <ol style='padding-left:8px;'>"
					+ "<li class='medium-font'>Kurutulmuş olarak teslim edilen primerlerinizi 100µM derişimli stok haline getirebilmek için '100µM stok-µL TE' başlıklı kolonda belirtilen miktar kadar nuclease-free water ya da TE buffer ile vorteks kullanmadan pipetaj ile primerleri çözünüz.</li>"
					+ "<li class='medium-font'>Su veya TE buffer ile çözülmüş primerler -20°C dolabında 6 ay, su veya TE buffer ile sulandırılmamış primerler +4°C dolabında 1 yıl saklanabilmektedir.</li>"
					+ "<li class='medium-font'>Primerlerinizi uzun süreli saklamak için TE Buffer ile çözünüz ve stok primerlerinizi don-çöz yapmayınız, kullanacağınız kadar seyreltip bölünmüş porsiyonlar (aliquot)  halinde muhafaza ediniz.</li>"
					+ "</ol>");
				$("<tfoot></tfoot>").appendTo(outerTable).append($("<tr></tr>").append(footTd));
				return mainTd;
			 }

			function createSingle(el, ordering, oligoname, sequence, bp, synthno, scala, purification, gc, mw, extcoef, tmbasic, tmneighbor, tmsalt, a260, conc, ng, totalnmol, od) {
				let div = $("<div></div>").addClass("single-report").css({"border-top": "solid","border-top-width": "1px", "border-top-color": "#222222"}).appendTo(el);
				div.append($("<button></button>").addClass("hidePrint btn btn-xs btn-danger  removeReport").html("Raporu Sil").appendTo(div));
				div.append($("<p></p>").addClass("small-font").css({"font-weight": "bold"}).html("#" + ordering + ". " + oligoname));
				div.append($("<p></p>").addClass("small-font").css({"fword-wrap":"break-word", "word-break": "break-all", "width": "650px !important", "max-width": "670px"}).append(
					$("<span></span>").css({"font-family":"Courier New","font-size": "8px"}).html("5'-<span class='reportData'>" + sequence + "</span>-3' - " + bp + " bp</span>")
				));
				let table = $("<table></table>").addClass("table").css({"margin-top": "0", "margin-bottom": "0", "border-top": "none"}).appendTo(div);
				let tbody = $("<tbody></tbody>").css({"border-top": "none"}).appendTo(table);
				let tr = $("<tr></tr>").css({"border-top": "none"}).appendTo(tbody);
				let td1 = $("<td></td>").css({"margin":"0", "padding":"0", "border-top": "none", "white-space":"nowrap"}).appendTo(tr);
				let table1 = $("<table></table>").addClass("table table-condensed").css({"border-collapse":"collapse"}).appendTo(td1);
				let tbody1 = $("<tbody></tbody>").appendTo(table1);
				tbody1.append($("<tr></tr>").html("<td class='col-sm-3 header'>Oligo No</td><td class='col-sm-9 sentezNoClass'>" + synthno + "</td><td class='hidePrint'><input class='editSentezNo' value=" + synthno + " /> </td>"));
				tbody1.append($("<tr></tr>").html("<td class='header'>Skala</td><td><span class='reportSkala'>" + scala + "</span> <span class='units'>nmol</span></td>"
					+ "<td class='hidePrint'><select class='editSkala'><option value='50'>50</option><option value='100'>100</option><option value='200'>200</option></select></td>"));
				tbody1.append($("<tr></tr>").html("<td class='header'>Saflastirma</td><td class='reportSaflastirma'>" + purification + "</td>"
					+ "<td class='hidePrint'><select class='editSaflastirma'><option value='Standard'>Standard</option><option value='OPC'>OPC</option><option value='HPLC'>HPLC</option><option value='PAGE'>PAGE</option></select></td>"));
				let td2 = $("<td></td>").css({"margin":"0", "padding":"0", "border-top": "none", "white-space":"nowrap"}).appendTo(tr);
				let table2 = $("<table></table>").addClass("table table-condensed").css({"border-collapse":"collapse"}).appendTo(td2);
				let tbody2 = $("<tbody></tbody>").appendTo(table2);
				tbody2.append($("<tr></tr>").html("<td class='col-sm-3 header'>GC</td><td class='col-sm-9'><span class='units'>%</span>" + (Number(gc)*100).toFixed(0) + "</td>"));
				tbody2.append($("<tr></tr>").html("<td class='header'>MW</td><td>" + Number(mw).toFixed(2) + "</td>"));
				tbody2.append($("<tr></tr>").html("<td class='col-sm-3 header'>A260</td><td class='col-sm-9'>" + Number(a260).toFixed(1) + "</td>"));
				let td3 = $("<td></td>").css({"margin":"0", "padding":"0", "border-top": "none", "white-space":"nowrap"}).appendTo(tr);
				let table3 = $("<table></table>").addClass("table table-condensed").css({"border-collapse":"collapse"}).appendTo(td3);
				let tbody3 = $("<tbody></tbody>").appendTo(table3);
				tbody3.append($("<tr></tr>").html("<td class='col-sm-3 imp'>Tm(Basic)</td><td class='col-sm-9' style='font-weight:600'><span class='units'>" + (tmbasic) + "</span></td>"));
				//tbody3.append($("<tr></tr>").html("<td class='header' style='ont-size: 8px'>Tm(N. neighbor)<sup>4</sup></td><td class='units' style='font-size: 8px;'> <span class='units'>" + tmneighbor + "°C</span></td>"));
				tbody3.append($("<tr></tr>").html("<td class='header'>Conc</td><td>" + Number(conc).toFixed(2) + "<span class='units'>ng/µl</span></td>"));
				tbody3.append($("<tr></tr>").html("<td class='header'> OD</td><td>" + Number(od).toFixed(1) + "</td>"));
				//let td4 = $("<td></td>").css({"margin":"0", "padding":"0", "border-top": "none", "white-space":"nowrap"}).appendTo(tr);
				//let table4 = $("<table></table>").addClass("table table-condensed").css({"border-collapse":"collapse"}).appendTo(td4);
				//let tbody4 = $("<tbody></tbody>").appendTo(table4);
				//tbody4.append($("<tr></tr>").html("<td class='col-sm-3 header'>A260</td><td class='col-sm-9'>" + a260 + "</td>"));
				//tbody4.append($("<tr></tr>").html("<td class='header'> OD</td><td>" + od + "</td>"));
				//tbody4.append($("<tr></tr>").html("<td class='header'>Conc</td><td>" + conc + "<span class='units'>ng/µl</span></td>"));
				//tbody4.append($("<tr></tr>").html("<td class='header'></td><td></td>"));
				let td5 = $("<td></td>").css({"margin":"0", "padding":"0", "border-top": "none", "white-space":"nowrap"}).appendTo(tr);
				let table5 = $("<table></table>").addClass("table table-condensed").css({"border-collapse":"collapse"}).appendTo(td5);
				let tbody5 = $("<tbody></tbody>").appendTo(table5);
				tbody5.append($("<tr></tr>").html("<td class='col-sm-3 header'> Total nmol</td><td class='col-sm-9'>" + Number(totalnmol).toFixed(2) + "<span class='units'>nmol</span></td>"));
				tbody5.append($("<tr></tr>").html("<td class='header'>Total ng</td><td>" + Number(ng).toFixed(2) + "<span class='units'>ng</span></td>"));
				//tbody5.append($("<tr></tr>").html("<td class='header'> OD</td><td>" + od + "</td>"));
				tbody5.append($("<tr></tr>").html("<td class='imp stok'> 100 µM stok - µl TE</td><td style='font-weight: 600'>" + (Number(totalnmol) * 10).toFixed(1) + "</td>"));
			}

			let body = $("<body></body>").append($("<input/>").attr("id","tarihInput")).append($("<button></button>").attr("id","tarihDegistir").html("Toplu tarih degistir"))
				.append($("<a></a>").attr("href","javascript:window.print()").addClass("hidePrint btn btn-default").html("Çıktı al"))
				.append($("<div></div>").addClass("hidePrint").css({"margin-bottom":"5em"}));
			let printarea = $("<div></div>").addClass("printablearea").appendTo(body);

			$.each(group6, function(k,v) {
				$.each(v, function(i,vv) {
					let thedate = vv[0]["synthname"].split("-")[0];
					let thedatewithdots = thedate.charAt(4) + thedate.charAt(5) + "." + thedate.charAt(2) + thedate.charAt(3) + ".20" + thedate.charAt(0) + thedate.charAt(1);
					console.log(vv[0], "   ", vv[0]["order.date"], "   ", thedate);
					let page6 = createPage6(printarea,k,thedatewithdots);
					$.each(vv, function(ii,vvv) {
						let gcperc= ((vvv.sequence.match(/G/g) || []).length + (vvv.sequence.match(/C/g) || []).length)/vvv.sequence.length*100;
						createSingle(page6, ii + 1, vvv.name, vvv.sequence, vvv.bp, vvv.synthname, vvv["primer_sca.id"], vvv["primer_puri.id"], vvv.gc, vvv.mw, vvv.excoef, vvv.tmbasic, "", "", vvv.a260, vvv.conc, vvv.totalng, vvv.totalnmol, vvv.od);
					});
				});
			});

			let my_window = window.open('', 'Dokuman', 'status=1,width=1000,height=800');

			my_window.document.open();
			my_window.document.write('<!DOCTYPE html><html lang=""><head><title>Sentez Musteri Raporu</title><link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">'
				+ '<link href="./css/contentblah.css" rel="stylesheet"/><link href="./css/report6.css" rel="stylesheet"/><script src="./js/modernizr.js"></script><script src="./jquery/jquery-3.3.1.js"></script></head>'
				+ '<script src="./js/report6.js"></script>' + body.html() + '</html>');
			my_window.document.close();

		}).toString(),
	tubeprintzIntergen: (function (data) {
		let toprint = $.getWidget('reporttable')
			.getCols([
				{ name: "user.company", render: false },
				{ name: "name", render: false },
				{ name: "sequence", render: false },
				{ name: "scale", render: false },
				{ name: "tmbasic", render: false },
				{ name: "mw", render: false },
				{ name: "synthname", render: false },
				{ name: "bp", render: false },
				{ name: "totalnmol" }
			]);
		let order = $.getWidget('reporttable').table.DataTable().rows({ order: 'applied' } )[0];
		let divs = $('<div>');
		$.each(order, function (i, v) {
			let seq1, seq2, val;
			val = toprint[v];

			if(val['user.company'].toUpperCase().includes("NTERGEN") === false && val['user.company'].toUpperCase().includes("EYS") === false) {
				//console.log(val['user.company']);
				return;
			}

			if (val['sequence'].length > 20) {
				seq1 = val['sequence'].substring(0, 20);
				seq2 = val['sequence'].substring(20);
			} else {
				seq1 = val['sequence'];
				seq2 = null;
			}
			let div = $('<div>').addClass('tubePage singlereport');
			let innerDiv = $('<div>').addClass('reportcontent');
			let div2 = $('<span>').addClass('compname').html(val['synthname'] + ' ' + val['sequence'].length + 'bp');
			let span = $('<span>').addClass('reportname').html(val['name'].replace(/\r?\n|\r/g,''));
			let span2 = $('<span>').addClass('reportdata').html(seq1);
			let span3 = $('<span>').addClass('reportdata2').html(seq2);
			let span4 = $('<span>').addClass('nmol').html('nmol: ' + val['totalnmol']);
			let img = $('<img>').attr('src', './Images/logo-white.png');
			let mw = $('<div>').addClass('mw').html("MW:" + val['mw']);
			let tmbasic = $('<div>').addClass('tmbasic').html("TM:" + val['tmbasic']);

			innerDiv.append(span).append('<br>').append(div2).append('<br>').append(span2).append('<br>').append(span3).append('<br>').append(span4).append('<br>').append(tmbasic).append(mw).append('<br>').append(img);
			div.append(innerDiv);

			divs.append(div);
		});
		console.log("DIVS: ", divs);

		let my_window = window.open('', 'Dokuman', 'status=1,width=1000,height=800');

		my_window.document.open();
		my_window.document.write('<html><head><link rel="stylesheet" href="./css/print-tubezebra.css"></head>' +
			'<body onload="window.print()">' + divs.html() + '</body></html>');
		my_window.document.close();
	}).toString(),
	tubeprintz: (function (data) {
		let toprint = $.getWidget('reporttable')
			.getCols([
				{ name: "user.company", render: false },
				{ name: "name", render: false },
				{ name: "sequence", render: false },
				{ name: "scale", render: false },
				{ name: "tmbasic", render: false },
				{ name: "mw", render: false },
				{ name: "synthname", render: false },
				{ name: "bp", render: false }
			]);
		let order = $.getWidget('reporttable').table.DataTable().rows({ order: 'applied' } )[0];
		let divs = $('<div>');
		$.each(order, function (i, v) {
			let seq1, seq2, val, happyending = "3'";
			val = toprint[v];
			if (val['sequence'].length > 20) {
				seq1 = "5'" + val['sequence'].substring(0, 20);
				if(val['sequence'].substring(20).length > 20 ) happyending = "...";
				seq2 = val['sequence'].substring(20) + happyending;
			} else {
				seq1 = "5'" + val['sequence'] + "3'";
				seq2 = null;
			}
			let div = $('<div>').addClass('tubePage singlereport');
			let innerDiv = $('<div>').addClass('reportcontent');
			let div2 = $('<div>').addClass('compname').html(val['synthname'] + ' ' + val['sequence'].length + 'bp');
			let span = $('<span>').addClass('reportname').html(val['name'].replace(/\r?\n|\r/g,''));
			let span2 = $('<span>').addClass('reportdata').html(seq1);
			let span3 = $('<span>').addClass('reportdata2').html(seq2);
			let img = $('<img>').attr('src', './Images/logo-white.png');
			let mw = $('<div>').addClass('mw').html("MW:" + val['mw']);
			let tmbasic = $('<div>').addClass('tmbasic').html("TM:" + val['tmbasic']);

			innerDiv.append(span).append(div2).append(span2).append('<br>').append(span3).append('<br>').append(tmbasic).append(mw).append('<br>').append(img);
			div.append(innerDiv);

			divs.append(div);
		});
		console.log("DIVS: ", divs);

		let my_window = window.open('', 'Dokuman', 'status=1,width=1000,height=800');

		my_window.document.open();
		my_window.document.write('<html><head><link rel="stylesheet" href="./css/print-tubezebra.css"></head>' +
			'<body onload="window.print()">' + divs.html() + '</body></html>');
		my_window.document.close();
	}).toString(),
	tubeprintzIntergensiz: (function (data) {
		let toprint = $.getWidget('reporttable')
			.getCols([
				{ name: "user.company", render: false },
				{ name: "name", render: false },
				{ name: "sequence", render: false },
				{ name: "scale", render: false },
				{ name: "tmbasic", render: false },
				{ name: "mw", render: false },
				{ name: "synthname", render: false },
				{ name: "bp", render: false }
			]);
		let order = $.getWidget('reporttable').table.DataTable().rows({ order: 'applied' } )[0];
		let divs = $('<div>');
		$.each(order, function (i, v) {
			let seq1, seq2, val, happyending = "3'";
			val = toprint[v];

			if(val['user.company'].toUpperCase().includes("NTERGEN") === true) {
				//console.log(val['user.company']);
				return;
			}

			if (val['sequence'].length > 20) {
				seq1 = "5'" + val['sequence'].substring(0, 20);
				if(val['sequence'].substring(20).length > 20 ) happyending = "...";
				seq2 = val['sequence'].substring(20) + happyending;
			} else {
				seq1 = "5'" + val['sequence'] + "3'";
				seq2 = null;
			}
			let div = $('<div>').addClass('tubePage singlereport');
			let innerDiv = $('<div>').addClass('reportcontent');
			let div2 = $('<div>').addClass('compname').html(val['synthname'] + ' ' + val['sequence'].length + 'bp');
			let span = $('<span>').addClass('reportname').html(val['name'].replace(/\r?\n|\r/g,''));
			let span2 = $('<span>').addClass('reportdata').html(seq1);
			let span3 = $('<span>').addClass('reportdata2').html(seq2);
			let img = $('<img>').attr('src', './Images/logo-white.png');
			let mw = $('<div>').addClass('mw').html("MW:" + val['mw']);
			let tmbasic = $('<div>').addClass('tmbasic').html("TM:" + val['tmbasic']);

			innerDiv.append(span).append(div2).append(span2).append('<br>').append(span3).append('<br>').append(tmbasic).append(mw).append('<br>').append(img);
			div.append(innerDiv);

			divs.append(div);
		});
		console.log("DIVS: ", divs);

		let my_window = window.open('', 'Dokuman', 'status=1,width=1000,height=800');

		my_window.document.open();
		my_window.document.write('<html><head><link rel="stylesheet" href="./css/print-tubezebra.css"></head>' +
			'<body onload="window.print()">' + divs.html() + '</body></html>');
		my_window.document.close();
	}).toString(),
};

let productionServices = {
	boxesdropdownservice: {
		source: "static",
		data: [
			{
				id: 1,
				val: "Kutu",
				func: "boxprint"
			},
			{
				id: 2,
				val: "Kutu Zebra",
				func: "boxprintz"
			}
		]
	},
	tubesdropdownservice: {
		source: "static",
		data: [
			{
				id: 1,
				val: "Tüp",
				func: "tubeprint"
			},
			{
				id: 2,
				val: "Tüp Intergen",
				func: "tubeprintIntergen"
			},
			{
				id: 3,
				val: "Tüp Zebra",
				func: "tubeprintz"
			},
			{
				id: 4,
				val: "Tüp Zebra Intergen",
				func: "tubeprintzIntergen"
			},
			{
				id: 5,
				val: "Tüp Zebra Intergensiz",
				func: "tubeprintzIntergensiz"
			}
		]
	},
	repeatservice: {
		source: "ajax",
		url: "repeatoligo"
	},
	synthupdateservice: {
		source: "ajax",
		url: "synthupdate"
	}
};

let adminnavbarservices = {
	userdropdownservice: {
		source: "static",
		data: [
			{
				link: "password.html",
				id: 1,
				icon: "lock icon",
				val: "Şifre Değiştir"
			},
			{
				func: "logout",
				id: 2,
				icon: "logout icon",
				val: "Güvenli Çıkış"
			}
		]
	},
	customeropdropdownservice: {
		source: "static",
		data: [
			{
				link: "cargo.html",
				id: 1,
				icon: "truck icon",
				val: "Kargo Takip Giriş"
			},
			{
				link: "customerp.html",
				id: 2,
				icon: "key icon",
				val: "Müşteri Pwd"
			}
		]
	},
	defsdropdownservice: {
		source: "static",
		data: [
			{
				link: "modification.html",
				id: 1,
				icon: "file alternate icon",
				val: "Modifikasyonlar"
			}, {
				link: "coupon.html",
				id: 2,
				icon: "file alternate icon",
				val: "Kuponlar"
			}
		]
	},
};

let ordersServices = {
	tableService: {
		source: "ajax",
		url: "table"
	},
	orderSummary: {
		source: "ajax",
		url: "orderSummary"
	},
	singletableAllService: {
		source: "singleajax",
		url: "tableAll",
		reqs: {
			primer_fifth: {
				table: "primer_fifth",
				columns: ["id", "val", "costval"]
			},
			primer_third: {
				table: "primer_third",
				columns: ["id", "val", "costval"]
			},
			primer_puri: {
				table: "primer_puri",
				columns: ["id", "val"]
			},
			primer_sca: {
				table: "primer_sca",
				columns: ["id", "val"]
			},
			/*
			primer_price: {
				table: "primer_price",
				columns: ["puriid","scaid","val"],
			},*/
			probe_fifth: {
				table: "probe_fifth",
				columns: ["id", "val"]
			},
			probe_third: {
				table: "probe_third",
				columns: ["id", "val"]
			},
			probe_pair: {
				table: "probe_pair",
				columns: ["fmodid", "tmodid", "val"]
			}
		}
	}
};

let ordernavbarfuncs = {
	logout: (function (data) {
		$.acm_auth("logout");
	}).toString(),
	translate_TR: (function (data) {
		console.log("translate to TR");
	}).toString(),
	translate_EN: (function (data) {
		console.log("translate to EN");
	}).toString()
};

let orderordersitems = {
	container: {
		type: "container",
		selector: "#maincontainer",
		options: {
			div: "content ui transition fade in container",
			structure: [
				{
					div: "ui segments", structure: [
						{
							div: "ui secondary segment", structure: [
								{ h3: "ui header", html: "Siparişlerim" }
							]
						},
						{ div: "ui segment #orderstable" }
					]
				},
				{ div: "#tmodholder" },
				{ div: "#fmodholder" },
				{ div: "#puriholder" },
				{ div: "#scaholder" },
				{ div: "#tmodholder2" },
				{ div: "#fmodholder2" },
				{ div: "#userholder" },
			]
		}
	},
	orderstable: {
		type: "table",
		selector: "#orderstable",
		options: {
			datasource: "tableService",
			fetchparams: {
				table: "orders",
				columns: ["id", "ordernum", "type", "productsnum", "completed", "approval", "date", "totalcost"],
				filter: {
					where: {
						orderdone: true
					}
				},
				order: ['orders.id DESC'],
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				"order": [],
				responsive: true,
				dom: '<"top">rt<"bottom"p><"clear">',
				columns: [{ data: "id", visible: false },
				{ data: "ordernum", title: "Sipariş No.", render: "link" },
				{ data: "date", title: "Sipariş Tarihi", render: "momentdate" },
				{ data: "type", title: "Ürün Tipi", render: "type"},
				{ data: "productsnum", title: "Toplam Ürün Sayısı" },
				{ data: "completed", title: "% Tamamlanan", render: "pbar" },
				{ data: "totalcost", title: "Toplam Tutar", render: "eur" },
				{ data: "approval", title: "Onay Durumu", render: "appr" },
					//{ data: "shipmentdate", title: "Shipment Date" }
				]
			}
		}
	},
	modal: {
		type: "dialog",
		selector: "#dialogcontainer",
		options: {
			scrollfix: true,
			div: "ui fullscreen modal",
			structure: [
				{ div: "header", html: "Sipariş Bilgisi" },
				{ div: "ui divider" },
				{ div: "noclass #modalform" },
				{ div: "ui divider" },
				{
					div: "actions", structure: [
						{ div: "ui deny button", html: "Kapat" }
					]
				}
			],
			widgets: ["ordercard", "primercard", "modaltable", "probetable", "seqtable", "genetable"]
		}
	},
	reportmodal: {
		type: "dialog",
		selector: "#reportcontainer",
		options: {
			scrollfix: true,
			div: "ui fullscreen modal",
			structure: [
				{ div: "header", html: "Rapor" },
				//{ div: "ui divider" },
				{ div: "noclass #reportform" },
			],
			widgets: ["reporttable", "reporttableprobe"]
		}
	},
	modalcontainer: {
		type: "container",
		selector: "#modalform",
		options: {
			div: "noclass",
			structure: [
				{
					div: "ui grid", structure: [
						{ div: "one wide column" },
						{ div: "six wide column #ordercard" },
						{ div: "two wide column" },
						{ div: "six wide column #primercard" },
						{ div: "one wide column" }
					]
				},
				{ div: "ui divider" },
				{
					div: "content ui", structure: [
						{div: "noclass #modaltable"},
						{div: "noclass #probetable"},
						{div: "noclass #seqtable"},
						{div: "noclass #genetable"},
						{div: "ui divider"},
						//{ div: "ui teal button #reportbutton", html: "Rapor" },
						//{ div: "ui teal button #excelbutton", html: "Excel İndir" }
						{
							div: "basic ui button #excelbutton", structure: [
								{ icon: "noclass", i: "ui download icon" },
								{ span: "noclass", html: "Excel İndir" }
							]
						},
						{
							div: "basic ui button #reportbutton", structure: [
								{ icon: "noclass", i: "ui eye icon" },
								{ span: "noclass", html: "Raporu Göster" }
							]
						},
					]
				}
			]
		}
	},
	reportcontainer: {
		type: "container",
		selector: "#reportform",
		options: {
			div: "noclass",
			structure: [
				{
					div: "content ui", structure: [
						{ div: "noclass #reporttable" },
						{ div: "noclass #reporttableprobe" },
					]
				}
			]
		}
	},
	ordercard: {
		type: "twocolcard",
		selector: "#ordercard",
		options: {
			datasource: "tableService",
			fetchparams: {
				filterapply: "orders",
				table: "orders",
				raw: true,
				columns: ["type", "totalbp", "totalcost", "date", "shipmentdate", "approval", "address", "info", "userid", "ordernum", "bill"],
				join: [
					{ table: "users", foreign: "userid", target: "userid", columns: ["mail", "userid", "phone"] },
				],
				/*
				tables: [
					{
						table: "orders",
						columns: ["type","totalbp", "totalcost", "date", "shipmentdate", "approval","address","info"]
					}
				],*/
				whereparams: ["id"]
			},
			div: "ui fluid card",
			structure: [
				{
					div: "content", structure: [
						{ div: "header", html: "Sipariş Bilgileri" }
					]
				},
				{
					div: "content", structure: [
						{ table: "ui very basic table" }
					]
				},
			],
			fields: [
				{ name: "ordernum", html: "Sipariş No" },
				{ name: "type", html: "Ürün Türü", render: "type" },
				{ name: "date", html: "Sipariş Tarihi", type: "date", render: "momentdate" },
				{ name: "approval", html: "Onay Durumu", render: "appr" }, //twocolrender
				{ name: "address", html: "Teslimat Adresi" },
				{ name: "info", html: "Ek Bilgi", render:"redtext" },
				{ name: "user.mail", html: "E-posta" },
				{ name: "user.phone", html: "Tel." },
				{ name: "totalcost", html: "Tutar €", render: "eur" }
			]
		}
	},
	primercard: {
		type: "twocolcard",
		selector: "#primercard",
		options: {
			datasource: "extraservice",
			fetchparams: {
				extra: "puricount",
				whereparams: ["orderid"],
			},
			div: "ui fluid card",
			structure: [
				{
					div: "content", structure: [
						{ div: "header", html: "Sipariş Toplamı" }
					]
				},
				{
					div: "content", structure: [
						{ table: "ui very basic table" }
					]
				},
			],
			fields: [
				{ name: "productsnum", html: "Adet", def: "0" },
				{ name: "totalbp", html: "Toplam BP", def: "-" },
				{ name: "1", html: "DSLT", def: "-" },
				{ name: "2", html: "OPC", def: "-" },
				{ name: "3", html: "HPLC", def: "-" }
			]
		}
	},
	modaltable: {
		type: "table",
		selector: "#modaltable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "primer",
				columns: ["id", "name", "sequence", "fmod", "tmod", "purification", "scale", "cost", "synthid", "orderid", "synthname"//,"dmt","tmbasic",
				],
				join: [
					{ table: "primer_puri", foreign: "purification" },
					{ table: "primer_fifth", foreign: "fmod" },
					{ table: "primer_sca", foreign: "scale" },
					{ table: "primer_third", foreign: "tmod" },
					{ table: "tracking", foreign: "trackingid", target: "id" },
				],
				whereparams: ["orderid"],
				order: ['primer.id ASC'],
			},
			table: "ui celled table",
			datatable: {
				order: [[0, "asc"]],
				responsive: true,
				pageLength: 100,
				dom: '<"top">rt<"bottom"p><"clear">',
				columns: [
					{ data: "id", visible: false },
					{ title: "#", data: null, render: "itemno" },
					{ name: "synthname", data: "synthname", title: "Oligo No" },
					{ name: "name", data: "name", title: "İsim" },
					{ name: "sequence", data: "sequence", title: "Sekans", render: "ellipsis3" },
					{ name: "primer_fifth.id", data: "primer_fifth.val", title: "5' Modifikasyonu"
						, "render": "nullrender", "defaultContent": ""
					},
					{ name: "primer_third.id", data: "primer_third.val", title: "3' Modifikasyonu"
						, "render": "nullrender", "defaultContent": ""
					},
					{ title: "bp", data: null, render: "getbp" },
					{ name: "primer_sca.id", data: "primer_sca.val", title: "Skala", render: "checkdata" },
					{ name: "primer_puri.id", data: "primer_puri.val", title: "Saflaştırma" },
					{ data: "synthid", data: "synthid", title: "Durum", render: "pstate" },
					{ name: "cost", data: "cost", title: "Tutar", render: "eur" },
					//{ name: "dmt", data: "dmt", visible: false},
					//{ name: "tmbasic", data: "tmbasic", visible: false},
				]
			}
		}
	},
	probetable: {
		type: "table",
		selector: "#probetable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "probe",
				columns: ["id", "name", "sequence", "fmod", "tmod", "cost", "synthid", "synthname"],
				join: [
					{ table: "probe_fifth", foreign: "fmod" },
					{ table: "probe_third", foreign: "tmod" },
					{ table: "tracking", foreign: "trackingid", target: "id" },
				],
				whereparams: ["orderid"],
				order: ['probe.id ASC']
			},
			table: "ui celled table",
			datatable: {
				order: [[0, "asc"]],
				responsive: true,
				pageLength: 100,
				dom: '<"top">rt<"bottom"p><"clear">',
				columns: [{ data: "id", visible: false },
				{ title: "#", data: null, render: "itemno" },
				{ name: "synthname", data: "synthname", title: "Oligo No" },
				{ name: "name", data: "name", title: "İsim" },
				{ name: "sequence", data: "sequence", title: "Sekans", render: "ellipsis3" },
				{ name: "probe_fifth.id", data: "probe_fifth.val", title: "5' Modifikasyonu" },
				{ name: "probe_third.id", data: "probe_third.val", title: "3' Modifikasyonu" },
				{ title: "bp", data: null, render: "getbp" },
				{ data: "synthid", data: "synthid", title: "Durum", render: "pstate" },
				{ name: "cost", data: "cost", title: "Tutar", render: "eur" }
				]
			}
		}
	},
	seqtable: {
		type: "table",
		selector: "#seqtable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "sequence",
				columns: ["id", "name", "type", "cons", "size", "pname", "pcons", "fasta", "cost", "puri"],
				join: [
					{ table: "tracking", foreign: "trackingid", target: "id" },
				],
				filter: {
					where: {
						ordered: true
					}
				},
				whereparams: ["orderid"],
				order: ['sequence.id ASC']
			},
			table: "ui celled table",
			datatable: {
				order: [[0, "asc"]],
				responsive: true,
				dom: '<"top">rt<"bottom"p><"clear">',
				columns: [{ data: "id", visible: false },
				{ title: "#", data: null, render: "itemno" },
				{ name: "name", data: "name", title: "İsim" },
				{ name: "type", data: "type", title: "Tip" },
				{ name: "cons", data: "cons", title: "Konsantrasyon" },
				{ name: "size", data: "size", title: "Uzunluk" },
				{ name: "pname", data: "pname", title: "Primer" },
				{ name: "pcons", data: "pcons", title: "Prim Kons." },
				{ name: "puri", data: "puri", title: "Saflaştırma", render: "seqpuri" },
				{ name: "fasta", data: "fasta", title: "Fasta", render: "ellipsis3" },
				{ name: "cost", data: "cost", title: "Tutar", render: "eur" },
				{ data: "tracking", data: "tracking", title: "Durum", render: "pstate" },
				]
			}
		}
	},
	genetable: {
		type: "table",
		selector: "#genetable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "gene",
				columns: ["id", "name", "sequence"],
				join: [
					{ table: "tracking", foreign: "trackingid", target: "id" },
				],
				whereparams: ["orderid"],
				order: ['gene.id ASC']
			},
			table: "ui celled table",
			datatable: {
				order: [[0, "asc"]],
				responsive: true,
				dom: '<"top">rt<"bottom"p><"clear">',
				columns: [
					{ data: "id", visible: false },
					{ title: "#", data: null, render: "itemno" },
					{ name: "name", data: "name", title: "İsim" },
					{ name: "sequence", data: "sequence", title: "Sekans", render: "ellipsis3" },
					{ title: "bp", data: null, render: "getbp" },
					{ name: "cost", data: "cost", title: "Tutar", render: "eur" }
				]
			}
		}
	},
	reporttable: {
		type: "table",
		selector: "#reporttable",
		options: {
			datasource: "editorService",
			oncreate: false,
			fetchparams: {
				table: "primer",
				columns: ["id", "name", "scale", "purification",
					"dmt", "a260", "tmbasic", "mw", "conc", "totalng", "od",
					"totalnmol", "sequence", "synthname"
				],
				join: [
					{ table: "primer_puri", foreign: "purification" },
					{ table: "primer_sca", foreign: "scale" },
				],
				whereparams: ["orderid"],
			},
			table: "ui celled table",
			datatable: {
				order: [],
				lengthChange: true,
				responsive: true,
				select: true,
				paging: false,
				dom: '<"top">Brt<"bottom"><"clear">',
				columns: [{ data: "id", visible: false, type: "hidden" },
				{ data: "synthname", name: "synthname", title: "Oligo No" },
				{ data: "primer_sca.val", name: "primer_sca.id", title: "Skala" },
				{ data: "primer_puri.val", name: "primer_puri.id", title: "Saflaştırma" },
				{ data: "name", name: "name", title: "İsim" },
				{ data: "sequence", name: "sequence", title: "Sekans", render: "ellipsis" },
				{ title: "bp", data: null, render: "getbp" },
				{ data: "dmt", name: "dmt", title: "DMT", render: "dmtrender2" },
				{ data: "tmbasic", name: "tmbasic", title: "Tm Basic" },
				{ data: "mw", name: "mw", title: "MW" },
				{ data: "conc", name: "conc", title: "Conc.(ng/ul)" },
				{ data: "a260", name: "a260", title: "A260" },
				{ data: "totalng", name: "totalng", title: "Total ng" },
				{ data: "od", name: "od", title: "OD" },
				{ data: "totalnmol", name: "totalnmol", title: "Total nmol" },
				],
				buttons: [
					{ extend: "excelHtml5", text: "Rapor İndir", Title: "SenteBioLab Sipariş Raporu" }
				]
			}
		}
	},
	reporttableprobe: {
		type: "table",
		selector: "#reporttableprobe",
		options: {
			datasource: "editorService",
			oncreate: false,
			fetchparams: {
				table: "probe",
				columns: ["id", "name", "dmt", "a260", "tmbasic", "mw", "conc", "totalng", "od",
					"totalnmol", "sequence", "synthname"
				],
				whereparams: ["orderid"],
			},
			table: "ui celled table",
			datatable: {
				order: [],
				lengthChange: true,
				responsive: true,
				select: true,
				paging: false,
				dom: '<"top">Brt<"bottom"><"clear">',
				columns: [{ data: "id", visible: false, type: "hidden" },
				{ data: "synthname", name: "synthname", title: "Oligo No" },
				{ data: "name", name: "name", title: "İsim" },
				{ data: "sequence", name: "sequence", title: "Sekans", render: "ellipsis" },
				{ title: "bp", data: null, render: "getbp" },
				{ data: "dmt", name: "dmt", title: "DMT", render: "dmtrender2" },
				{ data: "tmbasic", name: "tmbasic", title: "Tm Basic" },
				{ data: "mw", name: "mw", title: "MW" },
				{ data: "conc", name: "conc", title: "Conc.(ng/ul)" },
				{ data: "a260", name: "a260", title: "A260" },
				{ data: "totalng", name: "totalng", title: "Total ng" },
				{ data: "od", name: "od", title: "OD" },
				{ data: "totalnmol", name: "totalnmol", title: "Total nmol" },
				],
				buttons: [
					{ extend: "excelHtml5", text: "Rapor İndir", Title: "SenteBioLab Sipariş Raporu" }
				]
			}
		}
	},
	tmodholder: {
		type: "dataholder",
		selector: "#tmodholder",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "primer_third",
			},
			div: "hidden"
		}
	},
	fmodholder: {
		type: "dataholder",
		selector: "#fmodholder",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "primer_fifth",
			},
			div: "hidden"
		}
	},
	puriholder: {
		type: "dataholder",
		selector: "#puriholder",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "primer_puri",
			},
			div: "hidden"
		}
	},
	scaholder: {
		type: "dataholder",
		selector: "#scaholder",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "primer_sca",
			},
			div: "hidden"
		}
	},
	tmodholder2: {
		type: "dataholder",
		selector: "#tmodholder2",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "probe_third",
			},
		}
	},
	fmodholder2: {
		type: "dataholder",
		selector: "#fmodholder2",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "probe_fifth",
			},
		}
	},
	userholder: {
		type: "dataholder",
		selector: "#userholder",
		options: {
			oncreate: true,
			datasource: "tableService",
			fetchparams: {
				table: "users",
				columns: ["id","name", "mail","company",  "department" , "door" ,  "address"  , "phone" ]
			},
		}
	}
};

let productionorderdetailwidgets = {
	container: {
		type: "container",
		selector: "#maincontainer",
		options: {
			div: "ui vertically divided content container",
			structure: [
				{
					div: "ui grid", structure: [
						{ div: "one wide column" },
						{ div: "six wide column #ordercard" },
						{ div: "two wide column" },
						{ div: "six wide column #primercard" },
						{ div: "one wide column" }
					]
				},
				{ div: "ui divider" },
				{
					div: "content ui", structure: [
						{ div: "transition hidden #modaltable" },
						{ div: "transition hidden #probetable" },
						{ div: "transition hidden #seqtable" },
						{ div: "transition hidden #genetable" },
						{ div: "ui divider" },
						{ div: "ui basic button #excelbutton", html: "Excel İndir" },
						//{ div: "ui teal button #reportbutton", html: "Rapor" },
						//{ div: "ui teal button #excelbutton", html: "Excel İndir" }
					]
				},
				{ div: "ui divider" },
				//{div:"ui #tester"}
				{
					div: "vertpad actions centertext", structure: [
						{
							div: "ui green button #modifybtn", structure: [
								{ icon: "noclass", i: "ui check circle outline icon" },
								{ span: "noclass", html: "Siparişi Düzenle!" }
							]
						},
						{
							div: "ui red button #cancelbtn", structure: [
								{ icon: "noclass", i: "ui times circle outline icon" },
								{ span: "noclass", html: "Siparişi İptal Et!" }
							]
						}
					]
				},
				{ div: "#tmodholder" },
				{ div: "#fmodholder" },
				{ div: "#puriholder" },
				{ div: "#scaholder" },
				{ div: "#tmodholder2" },
				{ div: "#fmodholder2" },
				{ div: "#userholder" },
				{ div: "#billholder" },
				{ div: "#prompt" },
				{ div: "#priceholder" },
				{ div: "#priceholderprobe" },
			]
		}
	},
	tmodholder: {
		type: "dataholder",
		selector: "#tmodholder",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "primer_third",
			},
			div: "hidden"
		}
	},
	fmodholder: {
		type: "dataholder",
		selector: "#fmodholder",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "primer_fifth",
			},
			div: "hidden"
		}
	},
	puriholder: {
		type: "dataholder",
		selector: "#puriholder",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "primer_puri",
			},
			div: "hidden"
		}
	},
	scaholder: {
		type: "dataholder",
		selector: "#scaholder",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "primer_sca",
			},
			div: "hidden"
		}
	},
	tmodholder2: {
		type: "dataholder",
		selector: "#tmodholder2",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "probe_third",
			},
		}
	},
	fmodholder2: {
		type: "dataholder",
		selector: "#fmodholder2",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "probe_fifth",
			},
		}
	},
	userholder: {
		type: "dataholder",
		selector: "#userholder",
		options: {
			oncreate: false,
			datasource: "tableService",
			fetchparams: {
				table: "users",
				columns: ["id","name","mail","company","department","door", "address" ,"phone"],
				whereparams: ["userid"]
				//join: [{ table: "users", foreign: "id", target: "userid" },],
			},
		}
	},
	billholder: {
		type: "dataholder",
		selector: "#billholder",
		options: {
			oncreate: false,
			datasource: "tableService",
			fetchparams: {
				table: "orders",
				columns: ["id","ordernum","bill","address","project","taxnumber","taxoffice"],
				whereparams: ["id"]
				//join: [{ table: "users", foreign: "id", target: "userid" },],
			}
		}
	},
	prompt: {
		type: "prompt",
		selector: "#prompt",
		options: {
			semanticOptions: {
			}
		}
	},
	modal: {
		type: "dialog",
		selector: "#dialogcontainer",
		options: {
			div: "ui fullscreen modal",
			structure: [
				{ div: "header", html: "Düzenle" },
				{ div: "ui divider" },
				{ div: "noclass #modalform" },
				{ div: "ui divider" },
				{
					div: "actions", structure: [
						{ div: "ui approve button #approvebutton", html: "Düzenlemeyi Tamamla" },
						{ div: "ui deny button", html: "İptal" }
					]
				}
			],
			widgets: ["primeredittable", "probeedittable"]
		}
	},
	modalcontainer: {
		type: "container",
		selector: "#modalform",
		options: {
			div: "noclass",
			structure: [
				{
					div: "content ui", structure: [
						{ div: "noclass #primeredittable" },
						{ div: "noclass #probeedittable" }
					]
				}
			]
		}
	},
	primeredittable: {
		type: "table",
		selector: "#primeredittable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "primer",
				columns: ["id", "name", "sequence", "fmod", "tmod", "purification", "scale", "synthname"],
				join: [
					{ table: "primer_puri", foreign: "purification", addoptions: { value: "id", label: "val" }, datakey: "primer_puri.id" },
					{ table: "primer_fifth", foreign: "fmod", addoptions: { value: "id", label: "val" }, datakey: "primer_fifth.id" },
					{ table: "primer_sca", foreign: "scale", addoptions: { value: "id", label: "val" }, datakey: "primer_sca.id" },
					{ table: "primer_third", foreign: "tmod", addoptions: { value: "id", label: "val" }, datakey: "primer_third.id" }
				],
				whereparams: ["orderid"]
			},
			table: "ui celled table",
			datatable: {
				responsive: true,
				dom: '<"top">rt<"bottom"p><"clear">',
				columns: [
					{ data: "feck", title: "Sil", defaultContent: '', className: 'select-checkbox noneditable', orderable: false, type: "hidden" },
					{ data: "id", visible: false },
					{ name: "synthname", data: "synthname", title: "Oligo No" },
					{ name: "name", data: "name", title: "İsim" },
					{ name: "sequence", data: "sequence", title: "Sekans", render: "ellipsis2" },
					{ name: "primer_fifth.id", data: "primer_fifth.val", title: "5' Modifikasyonu", defOption: { value: "", label: "5' modifikasyonsuz", pos: 0 }, render: "checkdata", type: "select", editField: ["primer_fifth.id"] },
					{ name: "primer_third.id", data: "primer_third.val", title: "3' Modifikasyonu", defOption: { value: "", label: "3' modifikasyonsuz", pos: 0 }, render: "checkdata", type: "select", editField: ["primer_third.id"] },
					{ name: "primer_puri.id", data: "primer_puri.val", title: "Saflaştırma", render: "checkdata", type: "select", editField: ["primer_puri.id"] },
					{ name: "primer_sca.id", data: "primer_sca.val", title: "Skala", render: "checkdata", type: "select", editField: ["primer_sca.id"] },
				],
				select: {
					style: 'multi',
					selector: 'td.select-checkbox'
				}
			},
			editor: {
				allowed: ["feck", "id", "primer_fifth.val", "primer_third.val", "primer_puri.val", "primer_sca.val", "sequence", "name", "synthname"],
				bubble: {
					submit: "allIfChanged"
				},
				idSrc: "id",
				localeditor: true,
			}
		}
	},
	probeedittable: {
		type: "table",
		selector: "#probeedittable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "probe",
				columns: ["id", "name", "sequence", "fmod", "tmod", "synthname"],
				join: [
					{ table: "probe_fifth", foreign: "fmod", addoptions: { value: "id", label: "val" }, datakey: "probe_fifth.id" },
					{ table: "probe_third", foreign: "tmod", addoptions: { value: "id", label: "val" }, datakey: "probe_third.id" }
				],
				whereparams: ["orderid"]
			},
			table: "ui celled table",
			datatable: {
				responsive: true,
				dom: '<"top">rt<"bottom"p><"clear">',
				columns: [
					{ data: "feck", title: "Sil", defaultContent: '', className: 'select-checkbox noneditable', orderable: false, type: "hidden" },
					{ data: "id", visible: false },
					{ name: "synthname", data: "synthname", title: "Oligo No" },
					{ name: "name", data: "name", title: "İsim" },
					{ name: "sequence", data: "sequence", title: "Sekans", render: "ellipsis2" },
					{ name: "probe_fifth.id", data: "probe_fifth.val", title: "5' Modifikasyonu", defOption: { value: "", label: "5' modifikasyonsuz", pos: 0 }, render: "checkdata", type: "select", editField: ["probe_fifth.id"] },
					{ name: "probe_third.id", data: "probe_third.val", title: "3' Modifikasyonu", defOption: { value: "", label: "3' modifikasyonsuz", pos: 0 }, render: "checkdata", type: "select", editField: ["probe_third.id"] },
				],
				select: {
					style: 'multi',
					selector: 'td.select-checkbox'
				}
			},
			editor: {
				allowed: ["feck", "id", "probe_fifth.val", "probe_third.val", "sequence", "name", "synthname"],
				bubble: {
					submit: "allIfChanged",
				},
				idSrc: "id",
				localeditor: true,
			}
		}
	},
	priceholder: {
		type: "dataholder",
		selector: "#priceholder",
		options: {
			oncreate: false,
			datasource: "pricetable",
			fetchparams: {
				primer: true,
				whereparams: ["userid"]
			},
			div: "hidden"
		}
	},
	priceholderprobe: {
		type: "dataholder",
		selector: "#priceholderprobe",
		options: {
			oncreate: true,
			datasource: "singletableAllService",
			fetchparams: {
				sarid: "probe_pair",
			},
			div: "hidden"
		}
	},
};

let primerpoolwidgets = {
	primerpooltable: {
		type: "table",
		selector: "#primerpooltable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "primer",
				columns: ["id", "fmod", "name", "tmod", "purification", "scale", "sequence", "userid", "synthid"],
				join: [
					{ table: "users", foreign: "userid", target: "userid" },
					{ table: "orders", foreign: "orderid" },
					{ table: "primer_puri", foreign: "purification" },
					{ table: "primer_sca", foreign: "scale" },
					{ table: "primer_fifth", foreign: "fmod" },
					{ table: "primer_third", foreign: "tmod" }
				],
				filter: {
					/*where: {synthid:{
						op:"not",
						val:null
					}}*/
					where: {
						synthid: null,
						"order.approval": {
							op: "eq",
							val: true
						}
					}
				}
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				columns: [
					{ data: "id", visible: false, name: "id", type: "hidden" },
					{ title: "Sipariş #.", data: "order.ordernum", render: "checkdata" },
					{ title: "Sipariş Tarihi", data: "order.date", render: "momentdate" },
					//{ title: "Kuruluş", data: "user.company", render:"checkdata"},
					//{ title: "Müşteri", data: "user.name", render:"checkdata" },
					{ title: "5'", data: "primer_fifth.val", render: "checkdata" },
					{ title: "Oligo Adı", data: "name" },
					{ title: "3'", data: "primer_third.val", render: "checkdata" },
					{ title: "BP", data: null, render: "getbpred" },
					{ title: "Saflaştırma", data: "primer_puri.val", render: "checkdata" },
					{ title: "Skala (nmol)", data: "primer_sca.val", render: "checkdata" },
					{ data: "synthid", name: "synthid", visible: false, type: "hidden" },
				],
				select: {
					style: 'os',
					className: 'active'
				},
				//order: [[7, "asc"], [1, "asc"]],
				//order: [[2, "desc"]],
				order: [[2, "asc"],[0, "asc"]],
				//ordering: false,
				rowReorder: {
					dataSrc: 1,
					update: false
				},
				pageLength: 100,
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				pagingType: "full_numbers",
				"language": {
					processing: "Aranıyor...",
					info: "_PAGES_ Sayfadan _PAGE_. gösteriliyor",
					infoFiltered: " - _MAX_ satırdan filtrelendi",
					infoEmpty: "0 satır bulundu",
					infoPostFix: "",
					loadingRecords: "Kayıtlar yükleniyor...",
					zeroRecords: "Kayıt bulunamadı",
					emptyTable: "Tablo boş",
					lengthMenu: "_MENU_ kayıt göster.",
					search: "_INPUT_",
					searchPlaceholder: "Arama",
					select: {
						rows: "%d satır seçildi."
					}
				}
			},
			editor: {
				idSrc: 'id',
				allowed: ["id", "synthid"]
			}
		}
	}
};

let probepoolwidgets = {
	probepooltable: {
		type: "table",
		selector: "#probepooltable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "probe",
				columns: ["id", "fmod", "name", "tmod", "userid", "sequence", "synthid"],
				join: [
					{ table: "users", foreign: "userid", target: "userid" },
					{ table: "orders", foreign: "orderid" },
					{ table: "probe_fifth", foreign: "fmod" },
					{ table: "probe_third", foreign: "tmod" }
				],
				filter: {
					/*where: {synthid:{
						op:"not",
						val:null
					}}*/
					where: {
						synthid: null,
						"order.approval": {
							op: "eq",
							val: true
						}
					}
				}
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				columns: [
					{ data: "id", visible: false, name: "id", type: "hidden" },
					{ title: "Sipariş #.", data: "order.ordernum", render: "checkdata" },
					{ title: "Sipariş Tarihi", data: "order.date", render: "momentdate" },
					//{ title: "Kuruluş", data: "user.company", render:"checkdata"},
					//{ title: "Müşteri", data: "user.name", render:"checkdata" },
					{ title: "5'", data: "probe_fifth.val", render: "checkdata" },
					{ title: "Oligo Adı", data: "name" },
					{ title: "3'", data: "probe_third.val", render: "checkdata" },
					{ title: "BP", data: null, render: "getbpred" },
					{ data: "synthid", name: "synthid", visible: false, type: "hidden" }
				],
				select: {
					style: 'os',
					className: 'active'
				},
				//ordering: false,
				//order: [[1, "asc"]],
				//order: [[2, "desc"]],
				order: [[2, "asc"],[0, "asc"]],
				rowReorder: {
					dataSrc: 1,
					update: false
				},
				pageLength: 100,
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				pagingType: "full_numbers",
				"language": {
					processing: "Aranıyor...",
					info: "_PAGES_ Sayfadan _PAGE_. gösteriliyor",
					infoFiltered: " - _MAX_ satırdan filtrelendi",
					infoEmpty: "0 satır bulundu",
					infoPostFix: "",
					loadingRecords: "Kayıtlar yükleniyor...",
					zeroRecords: "Kayıt bulunamadı",
					emptyTable: "Tablo boş",
					lengthMenu: "_MENU_ kayıt göster.",
					search: "_INPUT_",
					searchPlaceholder: "Arama",
					select: {
						rows: "%d satır seçildi."
					}
				}
			},
			editor: {
				idSrc: 'id',
				allowed: ["id", "synthid"]
			}
		}
	}
};


let nextsyntheseswidgets = {
	synthlisttable: {
		type: "table",
		selector: "#synthlisttable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "primer",
				columns: ["id", "fmod", "name", "tmod", "purification", "scale", "userid", "sequence", "synthid", "orderid", "synthname","mw","gc","tmbasic","excoef","dmt"], //,"dmt","tmbasic"
				join: [
					{ table: "users", foreign: "userid", target: "userid" },
					{ table: "orders", foreign: "orderid" },
					{ table: "primer_puri", foreign: "purification", addoptions: { value: "id", label: "val" }, datakey: "primer_puri.id" },
					{ table: "primer_sca", foreign: "scale", addoptions: { value: "id", label: "val" }, datakey: "primer_sca.id" },
					{ table: "primer_fifth", foreign: "fmod", addoptions: { value: "id", label: "val" }, datakey: "primer_fifth.id" },
					//{ table: "primer_fifth", columns: ["id", "val" ,"mw", "e260"], foreign: "fmod" },
					{ table: "primer_third", foreign: "tmod", addoptions: { value: "id", label: "val" }, datakey: "primer_third.id" }
				],
				filter: {
					where: { synthid: 0 }
				}
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				columns: [
					{ data: "id", name: "id", visible: false, type: "hidden" },
					{ data: "synthname", name: "synthname", visible: false },
					{ title: "Sipariş #.", data: "order.ordernum", render: "checkdata" },
					{ title: "Sipariş Tarihi", data: "order.date", render: "momentdate" },
					{ title: "Oligo Adı", data: "name", name: "name" },
					{ title: "5'", placeholder: -1, data: "primer_fifth.val", name: "primer_fifth.id", render: "checkdata", type: "select" },
					{ title: "Sekans", data: "sequence", render: "ellipsis" },
					{ title: "3'", placeholder: -1, data: "primer_third.val", name: "primer_third.id", render: "checkdata", type: "select" },
					{ title: "BP", data: null, render: "getbp" },
					{ title: "Saflaştırma", data: "primer_puri.val", name: "primer_puri.id", render: "checkdata", type: "select" },
					{ title: "Skala (nmol)", data: "primer_sca.val", name: "primer_sca.id", render: "checkdata", type: "select" },
					{ data: "synthid", name: "synthid", visible: false },
					{ data: "orderid", name: "orderid", visible: false },
					{ data: "userid", name: "userid", visible: false },
					//{ data: "orderid", name: "orderid", visible: false },
					//{ data: "dmt", name: "dmt", visible: false },
					//{ data: "tmbasic", name: "tmbasic", visible: false },
					{ data: "mw", name: "mw", visible: false , placeholder: "null" },
					{ data: "gc", name: "gc", visible: false , placeholder: "null" },
					{ data: "tmbasic", name: "tmbasic", visible: false , placeholder: "null" },
					{ data: "excoef", name: "excoef", visible: false , placeholder: "null" },
					{ data: "dmt", name: "dmt", visible: false , placeholder: "null" }
				],
				pageLength: 100,
				order: [[9, "asc"], [12, "asc"], [0,"asc"]],
				select: {
					style: 'os',
					className: 'active'
				},
				rowReorder: {
					dataSrc: 1,
					update: false
				},
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				pagingType: "full",
				"language": {
					processing: "Aranıyor...",
					info: "_PAGES_ Sayfadan _PAGE_. gösteriliyor",
					infoFiltered: " - _MAX_ satırdan filtrelendi",
					infoEmpty: "0 satır bulundu",
					infoPostFix: "",
					loadingRecords: "Kayıtlar yükleniyor...",
					zeroRecords: "Kayıt bulunamadı",
					emptyTable: "Tablo boş",
					lengthMenu: "_MENU_ kayıt göster.",
					search: "_INPUT_",
					searchPlaceholder: "Arama",
					select: {
						rows: "%d satır seçildi."
					},
					buttons: {
						selectAll: "Hepsini Seç",
						selectNone: "Hiçbirini Seçme"
					}
				},
				buttons: [
					"selectAll",
					{ text: "Listeden Kaldır", attr: { id: 'remove_row' } },
					{ text: "Kontrol Grubundan Seç", attr: { id: 'control_group' } },
					{ text: "Sentez", attr: { id: 'syntheses' } }
				]
			},
			editor: {
				idSrc: "id",
				allowed: ["id", "synthid", "name", "sequence", "primer_fifth.val", "primer_third.val", "primer_puri.val", "primer_sca.val", "synthname", "orderid", "userid","mw","gc","tmbasic","excoef","dmt"] //,"orderid"
			}
		}
	},
	modal: {
		type: "dialog",
		selector: "#dialogcontainer",
		options: {
			div: "ui fullscreen modal",
			structure: [
				{ div: "header", html: "Sipariş Bilgisi" },
				{ div: "ui divider" },
				{ div: "noclass #modalform" },
				{ div: "ui divider" },
				{
					div: "actions", structure: [
						{ div: "ui approve button #approvebutton", html: "Seç" },
						{ div: "ui deny button", html: "Kapat" }
					]
				}
			],
			widgets: ["modaltable"]
		}
	},
	modalcontainer: {
		type: "container",
		selector: "#modalform",
		options: {
			div: "noclass",
			structure: [
				{
					div: "content ui", structure: [
						{ div: "noclass #modaltable" }
					]
				}
			]
		}
	},
	modaltable: {
		type: "table",
		selector: "#modaltable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "primer_control",
				columns: ["id", "name", "sequence", "fmod", "tmod", "purification", "scale"],
				join: [
					{ table: "primer_puri", foreign: "purification", addoptions: { value: "id", label: "val" }, datakey: "primer_puri.id" },
					{ table: "primer_fifth", foreign: "fmod", addoptions: { value: "id", label: "val" }, datakey: "primer_fifth.id" },
					{ table: "primer_sca", foreign: "scale", addoptions: { value: "id", label: "val" }, datakey: "primer_sca.id" },
					{ table: "primer_third", foreign: "tmod", addoptions: { value: "id", label: "val" }, datakey: "primer_third.id" }
				]
			},
			table: "ui celled table",
			datatable: {
				responsive: true,
				dom: '<"top">rt<"bottom"p><"clear">',
				columns: [
					{ data: "feck", defaultContent: '', className: 'select-checkbox noneditable', orderable: false, type: "hidden" },
					{ data: "id", visible: false },

					{ name: "name", data: "name", title: "İsim" },
					{ name: "sequence", data: "sequence", title: "Sekans", render: "ellipsis" },
					{ name: "primer_fifth.id", data: "primer_fifth.val", title: "5' Modifikasyonu", defOption: { value: "", label: "5' modifikasyonsuz", pos: 0 }, render: "checkdata", type: "select", editField: ["primer_fifth.id"] },
					{ name: "primer_third.id", data: "primer_third.val", title: "3' Modifikasyonu", defOption: { value: "", label: "3' modifikasyonsuz", pos: 0 }, render: "checkdata", type: "select", editField: ["primer_third.id"] },
					{ name: "primer_puri.id", data: "primer_puri.val", title: "Saflaştırma", render: "checkdata", type: "select", editField: ["primer_puri.id"] },
					{ name: "primer_sca.id", data: "primer_sca.val", title: "Skala", render: "checkdata", type: "select", editField: ["primer_sca.id"] }
				],
				select: {
					style: 'multi',
					selector: 'td.select-checkbox'
				}
			},
			editor: {
				allowed: ["feck", "id", "primer_fifth.val", "primer_third.val", "primer_puri.val", "primer_sca.val","name"],
				bubble: {
					submit: "allIfChanged",
				},
				idSrc: "id",
			}
		}
	}
}

let nextsyntheseswidgetsprobe = {
	synthlisttable: {
		type: "table",
		selector: "#synthlisttable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "probe",
				columns: ["id", "fmod", "name", "tmod", "userid", "sequence", "synthid", "orderid", "synthname","mw","gc","tmbasic","excoef","dmt"],
				join: [
					{ table: "users", foreign: "userid", target: "userid" },
					{ table: "orders", foreign: "orderid" },
					{ table: "probe_fifth", foreign: "fmod", addoptions: { value: "id", label: "val" }, datakey: "probe_fifth.id" },
					{ table: "probe_third", foreign: "tmod", addoptions: { value: "id", label: "val" }, datakey: "probe_third.id" }
				],
				filter: {
					where: { synthid: 0 }
				}
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				columns: [
					{ data: "id", name: "id", visible: false, type: "hidden" },
					{ data: "synthname", name: "synthname", visible: false },
					{ title: "Sipariş #.", data: "order.ordernum", render: "checkdata" },
					{ title: "Sipariş Tarihi", data: "order.date", render: "momentdate" },
					{ title: "Oligo Adı", data: "name", name: "name" },
					{ title: "5'", data: "probe_fifth.val", name: "probe_fifth.id", render: "checkdata", type: "select" },
					{ title: "Sekans", data: "sequence", render: "ellipsis" },
					{ title: "3'", data: "probe_third.val", name: "probe_third.id", render: "checkdata", type: "select" },
					{ title: "BP", data: null, render: "getbp" },
					{ data: "synthid", name: "synthid", visible: false },
					{ data: "orderid", name: "orderid", visible: false },
					{ data: "userid", name: "userid", visible: false },
					//{ data: "orderid", name: "orderid", visible: false },
					{ data: "mw", name: "mw", visible: false , placeholder: "null" },
					{ data: "gc", name: "gc", visible: false , placeholder: "null" },
					{ data: "tmbasic", name: "tmbasic", visible: false , placeholder: "null" },
					{ data: "excoef", name: "excoef", visible: false , placeholder: "null" },
					{ data: "dmt", name: "dmt", visible: false , placeholder: "null" }
				],
				pageLength: 100,
				order: [[10, "asc"], [0,"asc"]],
				select: {
					style: 'os',
					className: 'active'
				},
				rowReorder: {
					dataSrc: 1,
					update: false
				},
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				pagingType: "full",
				"language": {
					processing: "Aranıyor...",
					info: "_PAGES_ Sayfadan _PAGE_. gösteriliyor",
					infoFiltered: " - _MAX_ satırdan filtrelendi",
					infoEmpty: "0 satır bulundu",
					infoPostFix: "",
					loadingRecords: "Kayıtlar yükleniyor...",
					zeroRecords: "Kayıt bulunamadı",
					emptyTable: "Tablo boş",
					lengthMenu: "_MENU_ kayıt göster.",
					search: "_INPUT_",
					searchPlaceholder: "Arama",
					select: {
						rows: "%d satır seçildi."
					},
					buttons: {
						selectAll: "Hepsini Seç",
						selectNone: "Hiçbirini Seçme"
					}
				},
				buttons: [
					//{text: "yeni", extend:"create", editor: true },
					"selectAll",
					//"selectNone",
					{ text: "Listeden Kaldır", attr: { id: 'remove_row' } },
					{ text: "Kontrol Grubundan Seç", attr: { id: 'control_group' } },
					{ text: "Sentez", attr: { id: 'syntheses' } }
				],

			},
			editor: {
				idSrc: "id",
				allowed: ["id", "synthid", "name", "sequence", "probe_fifth.val", "probe_third.val", "synthname", "orderid", "userid","mw","gc","tmbasic","excoef","dmt"]
			}
		}
	},
	modal: {
		type: "dialog",
		selector: "#dialogcontainer",
		options: {
			div: "ui fullscreen modal",
			structure: [
				{ div: "header", html: "Sipariş Bilgisi" },
				{ div: "ui divider" },
				{ div: "noclass #modalform" },
				{ div: "ui divider" },
				{
					div: "actions", structure: [
						{ div: "ui approve button #approvebutton", html: "Seç" },
						{ div: "ui deny button", html: "Kapat" }
					]
				}
			],
			widgets: ["modaltable"]
		}
	},
	modalcontainer: {
		type: "container",
		selector: "#modalform",
		options: {
			div: "noclass",
			structure: [
				{
					div: "content ui", structure: [
						{ div: "noclass #modaltable" }
					]
				}
			]
		}
	},
	modaltable: {
		type: "table",
		selector: "#modaltable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "probe_control",
				columns: ["id", "name", "sequence", "fmod", "tmod"],
				join: [
					//{ table: "primer_puri", foreign: "purification", addoptions: { value: "id", label: "val" }, datakey: "primer_puri.id" },
					{ table: "probe_fifth", foreign: "fmod", addoptions: { value: "id", label: "val" }, datakey: "probe_fifth.id" },
					//{ table: "primer_sca", foreign: "scale", addoptions: { value: "id", label: "val" }, datakey: "primer_sca.id" },
					{ table: "probe_third", foreign: "tmod", addoptions: { value: "id", label: "val" }, datakey: "probe_third.id" }
				]
			},
			table: "ui celled table",
			datatable: {
				responsive: true,
				dom: '<"top">rt<"bottom"p><"clear">',
				columns: [
					{ data: "feck", defaultContent: '', className: 'select-checkbox noneditable', orderable: false, type: "hidden" },
					{ data: "id", visible: false },

					{ name: "name", data: "name", title: "İsim" },
					{ name: "sequence", data: "sequence", title: "Sekans", render: "ellipsis" },
					{ name: "probe_fifth.id", data: "probe_fifth.val", title: "5' Modifikasyonu", render: "checkdata", type: "select", editField: ["probe_fifth.id"] },
					{ name: "probe_third.id", data: "probe_third.val", title: "3' Modifikasyonu", render: "checkdata", type: "select", editField: ["probe_third.id"] },
					//{ name: "primer_puri.id", data: "primer_puri.val", title: "Saflaştırma", render:"checkdata",type: "select", editField: ["primer_puri.id"] },
					//{ name: "primer_sca.id", data: "primer_sca.val", title: "Skala", render: "checkdata",type: "select", editField: ["primer_sca.id"] }
				],
				select: {
					style: 'multi',
					selector: 'td.select-checkbox'
				}
			},
			editor: {
				allowed: ["feck", "id", "probe_fifth.val", "probe_third.val","sequence","name"],
				bubble: {
					submit: "allIfChanged",
				},
				idSrc: "id",
			}
		}
	}
}

cargodetailswidgets = {
	container: {
		type: "container",
		selector: "#maincontainer",
		options: {
			div: "ui vertically divided content container",
			structure: [
				{
					div: "ui grid", structure: [
						{ div: "one wide column" },
						{ div: "six wide column #ordercard" },
						{ div: "two wide column" },
						{ div: "six wide column #primercard" },
						{ div: "one wide column" }
					]
				},
				{ div: "ui divider" },
				{div: "content ui", structure: [
						{ div: "transition hidden #modaltable" },
						{ div: "transition hidden #probetable" },
						{ div: "transition hidden #seqtable" },
						{ div: "transition hidden #genetable" },
						{ div: "ui divider" },
						//{ div: "ui basic button #excelbutton", html: "Excel İndir" },
						//{ div: "ui teal button #reportbutton", html: "Rapor" },
						//{ div: "ui teal button #excelbutton", html: "Excel İndir" }
					]
				},
				{ div: "ui grid", structure:[
					{ div: "center aligned column", structure:[
						{ div: "ui big basic black button #sendmail", structure:[
							{ icon: "noclass", i: "ui paper plane outline icon" },
							{ span: "noclass", html: "Mail At!" },
						]}
					]}
				]},
				{ div: "ui divider" }
			]
		}
	},
		modal: {
			type: "dialog",
			selector: "#dialogcontainer",
			options: {
				scrollfix: true,
				div: "ui modal",
				structure: [
					{ div: "header", html: "Email gönder uyarısı" },
					{ div: "noclass #modalform" },
					{div: "actions", structure: [
						{ div: "ui blue filled button #setTakip", html: "Gönder" },
						{ div: "ui deny button", html: "Kapat" }
					]}
				],
				widgets: ["primerselect","probeselect","seqselect","geneselect"]
			}
		},
		modalcontainer: {
			type: "container",
			selector: "#modalform",
			options: {
				div: "modalform",
				structure: [
					{div: "ui grid", structure:[
						{div: "ui row",structure:[
							{div: "eight wide column #emailaddress"},
						]},
						{div: "ui row",structure:[
							{div: "eight wide column #tracking"},
						]},
						{div: "ui divider"},
						{div: "ui row",structure:[
							{ h4: "ten wide column", html: "Eklemek istediginiz: " }
						]},
						{div: "ui row",structure:[
							{div: "ten wide column #additional"}
						]},
						{div: "ui row",structure:[
							{div: "sixteen wide column content ui", structure: [
								{ div: "noclass #primerselect" },
								{ div: "noclass #probeselect" },
								{ div: "noclass #seqselect" },
								{ div: "noclass #geneselect" },
							]}
						]}
					]},

				]
			}
		},
		primerselect : {
			type: "table",
			selector: "#primerselect",
			options: {
				datasource: "editorService",
				fetchparams: {
					table: "primer",
					columns: ["id", "name", "synthname","trackingid","orderid","synthid","a260","repeat"],
					join: [
						{ table: "tracking", foreign: "trackingid", target: "id" },
					],
					whereparams: ["orderid"],
					order: ['id ASC'],
				},
				table: "ui celled table",
				datatable: {
					order : [],
					responsive: true,
					dom: '<"top">rt<"bottom"p><"clear">',
					columns: [
						{ data: "id", name: "id",  visible: false },
						{ title: "#", data: null, render: "itemno" },
						{ name: "name", data: "name", title: "Ad" },
						{ name: "trackingid", data: "trackingid", title: "Sevk Edildi","render": "trackingset"},
						{ name: "synthid", data: "synthid", title: "Senteze Alındı","render": "synthset"},
						{ data: "feck", defaultContent: '', className: 'select-checkbox noneditable center aligned', orderable: false,type:"hidden"}
						//{ name: "synthname", data: "synthname", title: "Oligo No" },
					],
					select: {
						//style:    'os',
						selector: 'td.select-checkbox',
						style: 'multi'
					}
				},
				editor: {
					allowed: ["feck"],
					bubble: {
						submit: "allIfChanged",
					},
					idSrc: "id",
				}
			}
		},
		probeselect : {
			type: "table",
			selector: "#probeselect",
			options: {
				datasource: "editorService",
				fetchparams: {
					table: "probe",
					columns: ["id", "name", "synthname","trackingid","orderid","synthid","a260","repeat"],
					join: [
						{ table: "tracking", foreign: "trackingid", target: "id" },
					],
					whereparams: ["orderid"],
					order: ['id ASC'],
				},
				table: "ui celled table",
				datatable: {
					order : [],
					responsive: true,
					dom: '<"top">rt<"bottom"p><"clear">',
					columns: [
						{ data: "id", name: "id",  visible: false },
						{ title: "#", data: null, render: "itemno" },
						{ name: "name", data: "name", title: "Ad" },
						{ name: "trackingid", data: "trackingid", title: "Sevk Edildi","render": "trackingset"},
						{ name: "synthid", data: "synthid", title: "Senteze Alındı","render": "synthset"},
						{ data: "feck", defaultContent: '', className: 'select-checkbox noneditable center aligned', orderable: false,type:"hidden"}
						//{ name: "synthname", data: "synthname", title: "Oligo No" },
					],
					select: {
						//style:    'os',
						selector: 'td.select-checkbox',
						style: 'multi'
					}
				}
			}
		},
		seqselect : {
			type: "table",
			selector: "#seqselect",
			options: {
				datasource: "editorService",
				fetchparams: {
					table: "sequence",
					columns: ["id", "name","trackingid","orderid"],
					join: [
						{ table: "tracking", foreign: "trackingid", target: "id" },
					],
					whereparams: ["orderid"],
					order: ['id ASC'],
				},
				table: "ui celled table",
				datatable: {
					order : [],
					responsive: true,
					dom: '<"top">rt<"bottom"p><"clear">',
					columns: [
						{ data: "id", name: "id",  visible: false },
						{ title: "#", data: null, render: "itemno" },
						{ name: "name", data: "name", title: "Ad" },
						{ name: "trackingid", data: "trackingid", title: "Sevk Edildi","render": "trackingset"},
						{ name: "synthid", data: "synthid", title: "Senteze Alındı","render": "synthset"},
						{ data: "feck", defaultContent: '', className: 'select-checkbox noneditable center aligned', orderable: false,type:"hidden"}
						//{ name: "synthname", data: "synthname", title: "Oligo No" },
					],
					select: {
						//style:    'os',
						selector: 'td.select-checkbox',
						style: 'multi'
					}
				}
			}
		},
		geneselect : {
			type: "table",
			selector: "#geneselect",
			options: {
				datasource: "editorService",
				fetchparams: {
					table: "gene",
					columns: ["id", "name","trackingid","orderid"],
					join: [
						{ table: "tracking", foreign: "trackingid", target: "id" },
					],
					whereparams: ["orderid"],
					order: ['id ASC'],
				},
				table: "ui celled table",
				datatable: {
					order : [],
					responsive: true,
					dom: '<"top">rt<"bottom"p><"clear">',
					columns: [
						{ data: "id", name: "id",  visible: false },
						{ title: "#", data: null, render: "itemno" },
						{ name: "name", data: "name", title: "Ad" },
						{ name: "trackingid", data: "trackingid", title: "Sevk Edildi","render": "trackingset"},
						{ name: "synthid", data: "synthid", title: "Senteze Alındı","render": "synthset"},
						{ data: "feck", defaultContent: '', className: 'select-checkbox noneditable center aligned', orderable: false,type:"hidden"}
						//{ name: "synthname", data: "synthname", title: "Oligo No" },
					],
					select: {
						//style:    'os',
						selector: 'td.select-checkbox',
						style: 'multi'
					}
				}
			}
		},
		emailaddress: {
			type: "input",
			selector: "#emailaddress",
			options:{
				div: "small ui left labeled fluid input",
				type: "text",
				label: {html: "EMail :",label: "ui label"}
			}
		},
		tracking: {
			type: "input",
			selector: "#tracking",
			options:{
				div: "small ui left labeled fluid input",
				type: "text",
				label: {html: "Takip No :",label: "ui label"}
			}
		},
		additional: {
			type: "textarea",
			selector: "#additional",
			options: {
				div: "ui left icon fluid input",
				rows: 5,
				name: "additional",
				placeholder: ""
			}
		},
}

productionorderdetailwidgets.ordercard = Object.assign({}, orderordersitems.ordercard);
productionorderdetailwidgets.primercard = Object.assign({}, orderordersitems.primercard);
productionorderdetailwidgets.primertable = Object.assign({}, orderordersitems.modaltable);
productionorderdetailwidgets.probetable = Object.assign({}, orderordersitems.probetable);
productionorderdetailwidgets.seqtable = Object.assign({}, orderordersitems.seqtable);
productionorderdetailwidgets.genetable = Object.assign({}, orderordersitems.genetable);

//cargodetailswidgets

cargodetailswidgets.ordercard = Object.assign({}, orderordersitems.ordercard);
cargodetailswidgets.primercard = Object.assign({}, orderordersitems.primercard);
cargodetailswidgets.primertable = Object.assign({}, orderordersitems.modaltable);
cargodetailswidgets.probetable = Object.assign({}, orderordersitems.probetable);
cargodetailswidgets.seqtable = Object.assign({}, orderordersitems.seqtable);
cargodetailswidgets.genetable = Object.assign({}, orderordersitems.genetable);





let passwordwidgets = {
	maincontainer: {
		type: "widgetform",
		selector: "#maincontainer",
		options: {
			div: "content ui transition fade in container large form", structure: [
				{
					div: "ui stacked segment", structure: [
						{
							div: "ui secondary segment", structure: [
								{ p: "noclass", html: "Şifre Değiştir" }
							]
						},
						{
							div: "ui segment", structure: [
								{
									div: "ui grid", structure: [
										{
											div: "ui sixteen wide column", structure: [
												{ div: "field #oldpassword" },
												{ div: "field #newpassword" },
												{ div: "field #newpasswordrepeat" },
											]
										},
										{
											div: "ui sixteen wide column", structure: [
												{ div: "ui fluid large teal button #passwordbutton", html: "Değiştir" }
											]
										}
									]
								}
							]
						}
					]
				},
				{ div: "ui error message" },
				{
					div: "ui success message hidden", structure: [
						{ div: "header", html: "Kayıt başarılı." },
						{ p: "noclass #loginlink", html: "E-posta adresiniz ve gelen şifre ile giriş ekranından giriş yapabilirsiniz." }
					]
				}
			],
			rules: {
				fields: {
					oldpasswordname: {
						identifier: 'oldpasswordname',
						rules: [
							{
								type: 'empty',
								prompt: 'Lütfen eski şifrenizi giriniz.'
							}
						]
					},
					newpasswordname: {
						identifier: 'newpasswordname',
						rules: [
							{
								type: 'empty',
								prompt: 'Lütfen yeni şifrenizi giriniz.'
							},
							{
								type: 'different[oldpasswordname]',
								prompt: 'Girilen şifre eskisi ile aynı.'
							}
						]
					},
					newpasswordrepeatname: {
						identifier: 'newpasswordrepeatname',
						rules: [
							{
								type: 'empty',
								prompt: 'Lütfen yeni şifrenizi tekrar giriniz.'
							},
							{
								type: 'match[newpasswordname]',
								prompt: 'Yeni girilen şifre eşleşmiyor.'
							}
						]
					}
				}
			}
		}
	},
	oldpassword: {
		type: "input",
		selector: "#oldpassword",
		options: {
			div: "ui left icon input",
			icon: "unlock alternate icon",
			type: "password",
			name: "oldpasswordname",
			placeholder: "Eski Şifre"
		}
	},
	newpassword: {
		type: "input",
		selector: "#newpassword",
		options: {
			div: "ui left icon input",
			icon: "lock icon",
			type: "password",
			name: "newpasswordname",
			placeholder: "Yeni Şifre"
		}
	},
	newpasswordrepeat: {
		type: "input",
		selector: "#newpasswordrepeat",
		options: {
			div: "ui left icon input",
			icon: "lock icon",
			type: "password",
			name: "newpasswordrepeatname",
			placeholder: "Yeni Şifre Tekrar"
		}
	}
};

let productionsyntheseswidgets = {
	synthesistable: {
		type: "table",
		selector: "#synthesistable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "primer",
				columns: ["id", "synthid", "synthname", "name", "fmod", "tmod", "purification", "scale", "sequence", "dmt", "orderid", "a260", "tmbasic", "mw", "conc", "totalng", "od",
					"totalnmol","excoef","gc"],
				join: [
					{ table: "synth", foreign: "synthid" },
					{ table: "primer_puri", foreign: "purification" },
					{ table: "primer_fifth", foreign: "fmod" },
					{ table: "primer_sca", foreign: "scale" },
					{ table: "primer_third", foreign: "tmod" },
					{ table: "orders", foreign: "orderid" }
				],
				whereparams: ["synthid"]
			},
			table: "ui celled table",

			datatable: {
				columns: [
					{ data: "id", name: "id", visible: false },
					{ data: "dmt", name: "dmt", visible: false },
					{ data: "synthid", name: "synthid", visible: false },
					{ title: "Sentez No", data: "synthname", name: "synthname", render: "checkdata", orderDataType: "prodno" },
					{ title: "Sipariş No", data: "order.ordernum", "name": "order.ordernum", render: "navigateorder" },
					{ title: "Oligo Adı", name: "name", data: "name" },
					{ title: "Saflaştırma", data: "primer_puri.val", render: "checkdata" },
					{ title: "Skala", data: "primer_sca.val", render: "checkdata" },
					{ title: "Sekans", data: "sequence", name: "sequence", render: "ellipsis3" },
					{ title: "BP", data: null, render: "getbp" },
					{ title: "5\'", data: "primer_fifth.val", render: "checkdata" },
					{ title: "3\'", data: "primer_third.val", render: "checkdata" },
					{ data: "fmod", name: "fmod", visible: false },
					{ data: "a260", name: "a260", visible: false },
					{ data: "tmbasic", name: "tmbasic", visible: false },
					{ data: "mw", name: "mw", visible: false },
					{ data: "conc", name: "conc", visible: false },
					{ data: "totalng", name: "totalng", visible: false },
					{ data: "od", name: "od", visible: false },
					{ data: "totalnmol", name: "totalnmol", visible: false },
					{ data: "excoef", name: "excoef", visible: false },
					{ data: "gc", name: "gc", visible: false }
				],
				order: [[3, "asc"]],
				columnDefs: [
					{ type: 'num-html', targets: 3 }
				],
				select: {
					style: 'os',
					className: 'active'
				},
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				paging: false,
				"language": {
					processing: "Aranıyor...",
					info: "_PAGES_ Sayfadan _PAGE_. gösteriliyor",
					infoFiltered: " - _MAX_ satırdan filtrelendi",
					infoEmpty: "0 satır bulundu",
					infoPostFix: "",
					loadingRecords: "Kayıtlar yükleniyor...",
					zeroRecords: "Kayıt bulunamadı",
					emptyTable: "Tablo boş",
					lengthMenu: "_MENU_ kayıt göster.",
					search: "_INPUT_",
					searchPlaceholder: "Arama",
					select: {
						rows: "%d satır seçildi."
					}
				},
				buttons: [
					{ text: "Rapor Göster", attr: { id: 'show_report' }, className: "ui basic green button" },
					{ text: "Rapor Hazırla", attr: { id: 'prepare_report' }, className: "ui basic blue button" },
					{ text: "İptal Et", attr: { id: 'cancel' }, className: "ui basic red button" },
					{ text: "CSV İndir", attr: { id: 'csv' }, className: "ui basic purple button" }
				]
			},
			editor: {
				idSrc: "id",
				allowed: ["id", "synthid" ,"synthname", "a260", "tmbasic", "mw", "conc", "totalng", "od", "totalnmol","dmt","excoef","gc"]
			}
		}
	},
	csvf: {
		type: "input",
		selector: "#csvf",
		options: {
			div: "ui left labeled small input",
			type: "number",
			name: "csvf",
			min: 0,
			label: { html: "5'(csv):", label: "ui label" },
			//placeholder: "5'(csv)",
			width: "80px",
			initial: 6
		}
	},
	csvi: {
		type: "input",
		selector: "#csvi",
		options: {
			div: "ui left labeled small input",
			type: "number",
			min: 0,
			name: "csvi",
			label: { html: "inozine(csv):", label: "ui label" },
			//placeholder: "inozine(csv)",
			width: "80px",
			initial: 6
		}
	},
	synthinfo: {
		type: "dataholder",
		selector: "#synthinfo",
		options: {
			oncreate: false,
			datasource: "editorService",
			fetchparams: {
				table: "synth",
				columns: ["id", "name", "type"],
				whereparams: ["id"],
			},
			div: "hidden"
		}
	},
	reportmodal: {
		type: "dialog",
		selector: "#reportcontainer",
		options: {
			scrollfix: true,
			div: "ui fullscreen modal",
			structure: [
				{ div: "header", html: "Rapor" },
				//{ div: "ui divider" },
				{ div: "noclass #reportform" },
			],
			widgets: ["reporttable"]
		}
	},
	reportcontainer: {
		type: "container",
		selector: "#reportform",
		options: {
			div: "noclass",
			structure: [
				{
					div: "content ui", structure: [
						{ div: "noclass #reporttable" },
					]
				}
			]
		}
	},
	reporttable: {
		type: "table",
		selector: "#reporttable",
		options: {
			datasource: "editorService",
			oncreate: false,
			fetchparams: {
				table: "primer",
				columns: ["id", "name", "scale", "purification",
					"dmt", "a260", "tmbasic", "mw", "conc", "totalng", "od",
					"totalnmol", "sequence","synthname","excoef","gc"
				],
				join: [
					{ table: "primer_puri", foreign: "purification" },
					{ table: "primer_sca", foreign: "scale" }
				],
				whereparams: ["synthid"],
			},
			table: "ui celled table",
			datatable: {
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				paging: false,
				select: false,
				dom: '<"top">rt<"bottom"><"clear">',
				columns: [
					{ data: "id", visible: false, type: "hidden" },
					{ title: "Sentez No", data: "synthname", name: "synthname", render: "checkdata", orderDataType: "prodno" },
					{ data: "primer_sca.val", name: "primer_sca.id", title: "Skala" },
					{ data: "primer_puri.val", name: "primer_puri.id", title: "Saflaştırma" },
					{ data: "name", name: "name", title: "İsim" },
					{ data: "sequence", "name": "sequence", render: "ellipsis" },
					{ title: "bp", data: null, render: "getbp" },
					{ data: "dmt", name: "dmt", title: "DMT", render: "dmtrender2" },
					{ data: "excoef", name: "excoef", title: "Ex.Coef." },
					{ data: "tmbasic", name: "tmbasic", title: "Tm Basic" },
					{ data: "mw", name: "mw", title: "MW" },
					{ data: "conc", name: "conc", title: "Conc.(ng/ul)" },
					{ data: "a260", name: "a260", title: "A260" },
					{ data: "totalng", name: "totalng", title: "Total ng" },
					{ data: "od", name: "od", title: "OD" },
					{ data: "totalnmol", name: "totalnmol", title: "Total nmol" }
				],
				order: [[1, "asc"]],
				columnDefs: [
					{ type: 'num-html', targets: 1 }
				]
			}
		}
	},
	prompt: {
		type: "prompt",
		selector: "#prompt",
		options: {
			semanticOptions: {
			}
		}
	},
};

let productionsyntheseswidgetsp = {
	synthesistable: {
		type: "table",
		selector: "#synthesistable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "probe",
				columns: ["id", "synthid", "synthname", "name", "fmod", "tmod", "sequence", "dmt", "orderid", "a260", "tmbasic", "mw", "conc", "totalng", "od",
					"totalnmol","excoef","gc"],
				join: [
					{ table: "synth", foreign: "synthid" },
					{ table: "probe_fifth", foreign: "fmod" },
					{ table: "probe_third", foreign: "tmod" },
					{ table: "orders", foreign: "orderid" }
				],
				whereparams: ["synthid"]
			},
			table: "ui celled table",

			datatable: {
				columns: [
					{ data: "id", name: "id", visible: false },
					{ data: "dmt", name: "dmt", visible: false },
					{ data: "synthid", name: "synthid", visible: false },
					{ title: "Sentez No", data: "synthname", name: "synthname", render: "checkdata", orderDataType: "prodno" },
					{ title: "Sipariş No", data: "order.ordernum", "name": "order.ordernum", render: "navigateorder" },
					{ title: "Oligo Adı", data: "name", name: "name" },
					{ title: "Sekans", data: "sequence", name: "sequence", render: "ellipsis3" },
					{ title: "BP", data: null, render: "getbp" },
					{ title: "5\'", data: "probe_fifth.val", render: "checkdata" },
					{ title: "3\'", data: "probe_third.val", render: "checkdata" },
					{ data: "fmod", name: "fmod", visible: false },
					{ data: "a260", name: "a260", visible: false },
					{ data: "tmbasic", name: "tmbasic", visible: false },
					{ data: "mw", name: "mw", visible: false },
					{ data: "conc", name: "conc", visible: false },
					{ data: "totalng", name: "totalng", visible: false },
					{ data: "od", name: "od", visible: false },
					{ data: "totalnmol", name: "totalnmol", visible: false },
					{ data: "excoef", name: "excoef", visible: false },
					{ data: "gc", name: "gc", visible: false }
				],
				order: [[3, "asc"]],
				columnDefs: [
					{ type: 'num-html', targets: 3 }
				],
				select: {
					style: 'os',
					className: 'active'
				},
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				paging: false,
				"language": {
					processing: "Aranıyor...",
					info: "_PAGES_ Sayfadan _PAGE_. gösteriliyor",
					infoFiltered: " - _MAX_ satırdan filtrelendi",
					infoEmpty: "0 satır bulundu",
					infoPostFix: "",
					loadingRecords: "Kayıtlar yükleniyor...",
					zeroRecords: "Kayıt bulunamadı",
					emptyTable: "Tablo boş",
					lengthMenu: "_MENU_ kayıt göster.",
					search: "_INPUT_",
					searchPlaceholder: "Arama",
					select: {
						rows: "%d satır seçildi."
					}
				},
				buttons: [
					{ text: "Rapor Göster", attr: { id: 'show_report' }, className: "ui basic green button" },
					{ text: "Rapor Hazırla", attr: { id: 'prepare_report' }, className: "ui basic blue button" },
					{ text: "İptal Et", attr: { id: 'cancel' }, className: "ui basic red button" },
					{ text: "CSV İndir", attr: { id: 'csv' }, className: "ui basic purple button" }
				]
			},
			editor: {
				idSrc: "id",
				allowed: ["id", "synthid", "synthname", "a260", "tmbasic", "mw", "conc", "totalng", "od", "totalnmol","dmt","excoef","gc"]
			}
		}
	},
	csvf: {
		type: "input",
		selector: "#csvf",
		options: {
			div: "ui left labeled small input",
			type: "number",
			name: "csvf",
			min: 0,
			label: { html: "5'(csv):", label: "ui label" },
			//placeholder: "5'(csv)",
			width: "80px",
			initial: 6
		}
	},
	csvi: {
		type: "input",
		selector: "#csvi",
		options: {
			div: "ui left labeled small input",
			type: "number",
			min: 0,
			name: "csvi",
			label: { html: "inozine(csv):", label: "ui label" },
			//placeholder: "inozine(csv)",
			width: "80px",
			initial: 6
		}
	},
	synthinfo: {
		type: "dataholder",
		selector: "#synthinfo",
		options: {
			oncreate: false,
			datasource: "editorService",
			fetchparams: {
				table: "synth",
				columns: ["id", "name", "type"],
				whereparams: ["id"],
			},
			div: "hidden"
		}
	},
	reportmodal: {
		type: "dialog",
		selector: "#reportcontainer",
		options: {
			scrollfix: true,
			div: "ui fullscreen modal",
			structure: [
				{ div: "header", html: "Rapor" },
				//{ div: "ui divider" },
				{ div: "noclass #reportform" },
			],
			widgets: ["reporttableprobe"]
		}
	},
	reportcontainer: {
		type: "container",
		selector: "#reportform",
		options: {
			div: "noclass",
			structure: [
				{
					div: "content ui", structure: [
						{ div: "noclass #reporttableprobe" },
					]
				}
			]
		}
	},
	reporttableprobe: {
		type: "table",
		selector: "#reporttableprobe",
		options: {
			datasource: "editorService",
			oncreate: false,
			fetchparams: {
				table: "probe",
				columns: ["id", "name", "dmt", "a260", "tmbasic", "mw", "conc", "totalng", "od",
					"totalnmol", "sequence", "synthname", "excoef", "gc"
				],
				whereparams: ["synthid"],
			},
			table: "ui celled table",
			datatable: {
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				paging: false,
				select: false,
				dom: '<"top">rt<"bottom"><"clear">',
				columns: [
					{ data: "id", visible: false, type: "hidden" },
					{ title: "Sentez No", data: "synthname", name: "synthname", render: "checkdata", orderDataType: "prodno" },
					{ data: "name", name: "name", title: "İsim" },
					{ data: "sequence", "name": "sequence", render: "ellipsis" },
					{ title: "bp", data: null, render: "getbp" },
					{ data: "dmt", name: "dmt", title: "DMT", render: "dmtrender2" },
					{ data: "excoef", name: "excoef", title: "Ex.Coef." },
					{ data: "tmbasic", name: "tmbasic", title: "Tm Basic" },
					{ data: "mw", name: "mw", title: "MW" },
					{ data: "conc", name: "conc", title: "Conc.(ng/ul)" },
					{ data: "a260", name: "a260", title: "A260" },
					{ data: "totalng", name: "totalng", title: "Total ng" },
					{ data: "od", name: "od", title: "OD" },
					{ data: "totalnmol", name: "totalnmol", title: "Total nmol" }
				],
				order: [[1, "asc"]],
				columnDefs: [
					{ type: 'num-html', targets: 1 }
				]
			}
		}
	},
	prompt: {
		type: "prompt",
		selector: "#prompt",
		options: {
			semanticOptions: {
			}
		}
	},
};

let pwdservices = {
	updatePwd: {
		source: "ajax",
		url: "updatePwd"
	}
};

let geneservices = {
	completegeneservice: {
		source: "ajax",
		url: "gene",
		params: {
			action: "complete"
		}
	}
}

let synthlistservices = {
	createsynthservice: {
		source: "ajax",
		url: "synth",
		params: {
			action: "create"
		}
	},
	addsynthservice: {
		source: "ajax",
		url: "synthadd",
		params: {
			action: "create"
		}
	},
	deletesynthservice: {
		source: "ajax",
		url: "synth",
		params: {
			action: "delete"
		}
	},
	orderProgressService: {
		source: "ajax",
		url: "orderUpdate"
	},
	updatesynthnameservice: {
		source: "ajax",
		url: "synth",
		params: {
			action: "name"
		}
	}
};

customerlistitems = { //CURPOS
	container: {
		type: "container",
		selector: "#pagecontainer",
		options: {
			div: "below_navbar ui content container",
			structure: [
				{
					div: "ui vertically divided grid", structure: [
						{
							div: "row", structure: [
								{
									div: "ui large header", structure: [
										{ icon: "noclass", i: "users icon" },
										{ div: "content", html: "Müşteriler" }
									]
								}
							]
						},
						{
							div: "row", structure: [
								{
									div: "column", structure: [
										{ div: "#customertable" }
									]
								}
							]
						},
					]
				},
				{ div: "#tmodholder" },
				{ div: "#fmodholder" },
				{ div: "#puriholder" },
				{ div: "#scaholder" },
				{ div: "#tmodholder2" },
				{ div: "#fmodholder2" },
				{ div: "#pairholder" }
			]
		}
	},
	customertable: {
		type: "table",
		selector: "#customertable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "users",
				columns: ["id","name", "company", "department", "mail", "phone", "userid",
					{ col: "id", fn: "COUNT", as: "ordercount", table: "order"}
				],
				join: [
					{ table: "acm_users", foreign: "userid", columns: ["role"] },
					{ table: "orders", foreign: "userid", columns: [], target: "userid",where:{"orderdone": true},"required":false},
				],
				group: ["users.id","acm_user.id"],
				filter: {
					where: {
						"acm_user.role": {
							op: "eq",
							val: 1
						}
					}
				}
			},
			oncreate: true,
			table: "ui celled table",

			datatable: {
				columns: [
					{ data: "userid", visible: false, type: "hidden" },
					{ title: "Müşteri", data: "name", render: "orderlistlink" },
					{ title: "Kurum", data: "company" },
					{ title: "Departman", data: "department" },
					{ title: "Mail", data: "mail" },
					{ title: "Tel.", data: "phone" },
					{ title: "Siparişler", data: "ordercount",render: "orderlistlink"},
					{ title: "Dosya Giriş", data: null, render: "fileorder" },
				],
				select: false,
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				pageLength: 100,
				pagingType: "full",
				"language": {
					processing: "Aranıyor...",
					info: "_PAGES_ Sayfadan _PAGE_. gösteriliyor",
					infoFiltered: " - _MAX_ satırdan filtrelendi",
					infoEmpty: "0 satır bulundu",
					infoPostFix: "",
					loadingRecords: "Kayıtlar yükleniyor...",
					zeroRecords: "Kayıt bulunamadı",
					emptyTable: "Tablo boş",
					lengthMenu: "_MENU_ kayıt göster.",
					search: "_INPUT_",
					searchPlaceholder: "Arama",
					select: {
						rows: "%d satır seçildi."
					}
				}
			}
		}
	},
	tmodholder: {
		type: "dataholder",
		selector: "#tmodholder",
		options: {
			oncreate: true,
			datasource: "tableService",
			fetchparams: {
				table: "primer_third",
				columns: ["id", "val"]
			},
			div: "hidden"
		}
	},
	tmodholder2: {
		type: "dataholder",
		selector: "#tmodholder2",
		options: {
			oncreate: true,
			datasource: "tableService",
			fetchparams: {
				table: "probe_third",
				columns: ["id", "val"]
			},
			div: "hidden"
		}
	},
	fmodholder: {
		type: "dataholder",
		selector: "#fmodholder",
		options: {
			oncreate: true,
			datasource: "tableService",
			fetchparams: {
				table: "primer_fifth",
				columns: ["id", "val"]
			},
			div: "hidden"
		}
	},
	fmodholder2: {
		type: "dataholder",
		selector: "#fmodholder2",
		options: {
			oncreate: true,
			datasource: "tableService",
			fetchparams: {
				table: "probe_fifth",
				columns: ["id", "val"]
			},
			div: "hidden"
		}
	},
	puriholder: {
		type: "dataholder",
		selector: "#puriholder",
		options: {
			oncreate: true,
			datasource: "tableService",
			fetchparams: {
				table: "primer_puri",
				columns: ["id", "val"]
			},
			div: "hidden"
		}
	},
	scaholder: {
		type: "dataholder",
		selector: "#scaholder",
		options: {
			oncreate: true,
			datasource: "tableService",
			fetchparams: {
				table: "primer_sca",
				columns: ["id", "val"]
			},
			div: "hidden"
		}
	},
	pairholder : {
		type: "dataholder",
		selector: "#pairholder",
		options: {
			oncreate: true,
			datasource: "tableService",
			fetchparams: {
				table: "probe_pair",
				columns: ["fmodid","tmodid","val"]
			},
			div: "hidden"
		}
	}
}

/*primer_fifth: {
	table: "primer_fifth",
	columns: ["id","val","costval"]
},
primer_third: {
	table: "primer_third",
	columns: ["id","val","costval"]
},
primer_puri: {
	table: "primer_puri",
	columns: ["id","val"]
},
primer_sca: {
	table: "primer_sca",
	columns: ["id","val"]
},
primer_price: {
	table: "primer_price",
	columns: ["puriid","scaid","val"],
},
probe_fifth: {
	table: "probe_fifth",
	columns: ["id","val"]
},
probe_third: {
	table: "probe_third",
	columns: ["id","val"]
},
probe_pair : {
	table: "probe_pair",
	columns: ["fmodid","tmodid","val"]
}*/

orderlistitems = {
	container: {
		type: "container",
		selector: "#pagecontainer",
		options: {
			div: "below_navbar ui content container",
			structure: [
				{
					div: "ui vertically divided grid container", structure: [
						{
							div: "row", structure: [
								{
									div: "ui large header", structure: [
										{ icon: "noclass", i: "clipboard outline icon" },
										{ div: "content", html: "Eski Siparişler" }
									]
								}
							]
						},
						{
							div: "row", structure: [
								{
									div: "column", structure: [
										{ div: "#orderlisttable" }
									]
								}
							]
						},
						{
							div: "row", structure: [
								{ div: "eight wide colum #buttoncontainer" },
							]
						}
					]
				}
			]
		}
	},
	orderlisttable: {
		type: "table",
		selector: "#orderlisttable",
		options: {
			datasource: "tableService",
			fetchparams: {
				table: "orders",
				columns: ["id", "type", "ordernum", "date", "productsnum", "completed","userid"],
				filter: {
					where: {
						orderdone: true
					}
				},
				order: ['orders.id DESC'],
				whereparams: ["userid"]
			},
			oncreate: false,
			table: "ui celled table",

			datatable: {
				order: [],
				columns: [
					//{ title: "Müşteri", data: "customer" },
					{ data: "id", visible: false, type: "hidden" },
					{ title: "Sipariş No", data: "ordernum", render: "orderdetailslink" },
					{ title: "Tip", data: "type", render: "type" },
					{ title: "Sipariş Tarihi", data: "date", render: "momentdate" },
					{ title: "Ürün Sayısı", data: "productsnum" },
					{ title: "Tamamlanma", data: "completed", render: "pbar" },
					{ data: "userid", visible: false, type: "hidden" },
					/*
					{
						title: "Durum",
						data: "order_status",
						render: function (data, type, row, meta) {
							if (data === 0) {
								return '<a class="ui label" id="btn_' + row.id + '"><i class="right arrow icon"> </i>Fatura Yükle</a>';
							} else if (data === 1) {
								return '<div id="btn_' + row.id + '" class="ui label"><i class="thumbs up icon"></i> Fatura Mevcut</div>';
							} else if (data === -1) {
								return '<a class="ui label"><i class="thumbs down icon"></i> Tekrar Fatura Yükle</a>';
							}
						}
					}
					*/
				],
				select: {
					style: 'os',
					className: 'active'
				},
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				pagingType: "full",
				"language": {
					processing: "Aranıyor...",
					info: "_PAGES_ Sayfadan _PAGE_. gösteriliyor",
					infoFiltered: " - _MAX_ satırdan filtrelendi",
					infoEmpty: "0 satır bulundu",
					infoPostFix: "",
					loadingRecords: "Kayıtlar yükleniyor...",
					zeroRecords: "Kayıt bulunamadı",
					emptyTable: "Tablo boş",
					lengthMenu: "_MENU_ kayıt göster.",
					search: "_INPUT_",
					searchPlaceholder: "Arama",
					select: {
						rows: "%d satır seçildi."
					}
				}
			}
		}
	}
}

orderdetailsitems = {
	container: {
		type: "container",
		selector: "#pagecontainer",
		options: {
			div: "below_navbar ui content container",
			structure: [
				{
					div: "ui grid", structure: [
						{ div: "one wide column" },
						{ div: "six wide column #ordercard" },
						{ div: "two wide column" },
						{ div: "six wide column #primercard" },
						{ div: "one wide column" }
					]
				},
				{ div: "ui divider" },
				{ div: "ui header", html: "Sipariş Tablosu" },
				{ div: "transition hidden #modaltable" },
				{ div: "transition hidden #probetable" },
				{ div: "transition hidden #seqtable" },
				{ div: "transition hidden #genetable" },
				/*{div: "content ui", structure: [
						{ div: "noclass #modaltable" },
						{ div: "ui divider" },
						{ div: "ui teal button #reportbutton", html: "Rapor" },
						{ div: "ui teal button #excelbutton", html: "Excel İndir" }
				]}*/
			]
		}
	}
}

productionOrderListItems = {
	orderlisttable: {
		type: "table",
		selector: "#orderlisttable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "orders",
				columns: ["id", "type", "ordernum", "productsnum", "totalbp", "totalcost", "completed", "approval", "date", "userid", "scale", "mailsent"],
				join: [
					{ table: "users", foreign: "userid" /*, addoptions: {value:"id", label:"username"}*/, target: "userid" } //, datakey:"user.id"}
				],
				filter: {
					where: {
						orderdone: true,
						"orders.id": {
							op: "not",
							val: 0
						},
						"orders.type": {
							op: "in",
							val: ["primer","probe"]
						},
						"orders.date": {
							op: "between",
							val : ['1000-01-30','3000-01-30']
						},
					},
					limit:200
				},
				order: ['orders.id DESC'], //['orders.type ASC','orders.id DESC'] backend: attr.order = [db.sequelize.literal('orders.type ASC'), db.sequelize.literal('orders.id DESC')]
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				//"ordering": false,
				pageLength: 100,
				order: [],
				columns: [
					{ title: "#", data: null, render: "itemno" },
					{ data: "id", visible: false, type: "hidden" },
					{ data: "mailsent", name:"mailsent", visible: false},
					//{title: "Müşteri", data: "user.name" },
					{ title: "Sipariş Numarası", data: "ordernum", render: "podlink" },
					{ title: "Tür", data: "type", render: "type" },
					{ title: "Skala", data: "scale", render: "orderscale" },// TO DO ORTAK SKALA
					{ title: "Sipariş Tarihi", data: "date", render: "momentdate" },
					{ title: "# Ürün", data: "productsnum" }, // TO DO render func sayı-çember-kare-link
					{ title: "Tamamlanma Oranı", data: "completed", render: "pbar" },
					{ title: "Onay", data: "approval", render: "apprbtn" }
					//{title: "E-posta", data: null,render: "mailbtn"}
				],
				buttons: [
					//{ extend: "edit", editor: true, text: "Güncelle" },
				],
				//select: {style: 'os',className: 'active'},
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				pagingType: "full",
				"language": {
					processing: "Aranıyor...",
					info: "_PAGES_ Sayfadan _PAGE_. gösteriliyor",
					infoFiltered: " - _MAX_ satırdan filtrelendi",
					infoEmpty: "0 satır bulundu",
					infoPostFix: "",
					loadingRecords: "Kayıtlar yükleniyor...",
					zeroRecords: "Kayıt bulunamadı",
					emptyTable: "Tablo boş",
					lengthMenu: "_MENU_ kayıt göster.",
					search: "_INPUT_",
					searchPlaceholder: "Arama",
					//select: {rows: "%d satır seçildi."}
				}
			},
			editor: {
				idSrc: 'id',
				allowed: ["id", "completed", "approval", "mailsent"]
			},
			bubble: {
				submit: "allIfChanged",
				selector: "tbody td:not(:last-child)"
			},
		}
	},
	mailmodal: {
		type: "dialog",
		selector: "#mailmodal",
		options: {
			datasource: "mailService",
			div: "ui modal",
			structure: [
				{ div: "header", html: "E-posta Gönder" },
				{ div: "content #mailform" },
				{ div: "ui divider" },
				{
					div: "actions", structure: [
						{ div: "ui deny button", html: "Kapat" },
						{ div: "ui green button #sendbutton", html: "Gönder" }
					]
				}
			]
		}
	},
	mailform: {
		type: "widgetform",
		selector: "#mailform",
		options: {
			div: "ui form",
			structure: [
				{
					div: "ui basic small buttons", structure: [
						{ div: "ui small button #mailtrbtn", html: "tr-TR" },
						{ div: "ui small button #mailenbtn", html: "en-US" }
					]
				},
				{ div: "field #mailheader" },
				{ div: "field #mailcontent" },
				{ div: "", html: "Gönderen :" },
				{ div: "#mailsender" },
				{ div: "ui error message" }
			]
		}
	},
	mailcontent: {
		type: "textarea",
		selector: "#mailcontent",
		options: {
			div: "ui left icon fluid input",
			rows: 20,
			name: "mail",
			placeholder: "Eposta içeriği"
		}
	},
	mailheader: {
		type: "input",
		selector: "#mailheader",
		options: {
			div: "small ui fluid input",
			type: "text",
			name: "name"
		}
	},
	prompt: {
		type: "prompt",
		selector: "#prompt",
		options: {
			semanticOptions: {
			}
		}
	},
	mailsender: {
		type: "ddown",
		selector: "#mailsender",
		options: {
			oncreate: true,
			name: "mailsender",
			datasource: "mailsenderservice",
			div: "ui labeled selection dropdown icon",
			header: [
				{ span: "text" },
				{ icon: "dropdown icon" }
			],
			selected: 1
		}
	}
}

//let seqproductionOrderListItems = Object.assign({}, productionOrderListItems);
//seqproductionOrderListItems.orderlisttable = Object.assign({}, productionOrderListItems.orderlisttable);
//seqproductionOrderListItems.orderlisttable.options.fetchparams.filter.where["orders.type"].val = ["gene","sequence"];

let seqproductionOrderListItems = {
	orderlisttable: {
		type: "table",
		selector: "#orderlisttable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "orders",
				columns: ["id", "type", "ordernum", "productsnum", "totalbp", "totalcost", "completed", "approval", "date", "userid", "scale", "mailsent"],
				join: [
					{ table: "users", foreign: "userid" /*, addoptions: {value:"id", label:"username"}*/, target: "userid" } //, datakey:"user.id"}
				],
				filter: {
					where: {
						orderdone: true,
						"orders.id": {
							op: "not",
							val: 0
						},
						"orders.type": {
							op: "in",
							val: ["gene","sequence"]
						}
					}
				},
				order: ['orders.id DESC'], //['orders.type ASC','orders.id DESC'] backend: attr.order = [db.sequelize.literal('orders.type ASC'), db.sequelize.literal('orders.id DESC')]
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				//"ordering": false,
				order: [],
				columns: [
					{ data: "id", visible: false, type: "hidden" },
					{ data: "mailsent", name:"mailsent", visible: false},
					//{title: "Müşteri", data: "user.name" },
					{ title: "Sipariş Numarası", data: "ordernum", render: "podlink" },
					{ title: "Tür", data: "type", render: "type" },
					{ title: "Skala", data: "scale", render: "orderscale" },// TO DO ORTAK SKALA
					{ title: "Sipariş Tarihi", data: "date", render: "momentdate" },
					{ title: "# Ürün", data: "productsnum" }, // TO DO render func sayı-çember-kare-link
					{ title: "Tamamlanma Oranı", data: "completed", render: "pbar" },
					{ title: "Onay", data: "approval", render: "apprbtn" }
					//{title: "E-posta", data: null,render: "mailbtn"}
				],
				buttons: [
					//{ extend: "edit", editor: true, text: "Güncelle" },
				],
				//select: {style: 'os',className: 'active'},
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				pagingType: "full",
				"language": {
					processing: "Aranıyor...",
					info: "_PAGES_ Sayfadan _PAGE_. gösteriliyor",
					infoFiltered: " - _MAX_ satırdan filtrelendi",
					infoEmpty: "0 satır bulundu",
					infoPostFix: "",
					loadingRecords: "Kayıtlar yükleniyor...",
					zeroRecords: "Kayıt bulunamadı",
					emptyTable: "Tablo boş",
					lengthMenu: "_MENU_ kayıt göster.",
					search: "_INPUT_",
					searchPlaceholder: "Arama",
					//select: {rows: "%d satır seçildi."}
				}
			},
			editor: {
				idSrc: 'id',
				allowed: ["id", "completed", "approval", "mailsent"]
			},
			bubble: {
				submit: "allIfChanged",
				selector: "tbody td:not(:last-child)"
			},
		}
	},
	mailmodal: {
		type: "dialog",
		selector: "#mailmodal",
		options: {
			datasource: "mailService",
			div: "ui modal",
			structure: [
				{ div: "header", html: "E-posta Gönder" },
				{ div: "content #mailform" },
				{ div: "ui divider" },
				{
					div: "actions", structure: [
						{ div: "ui deny button", html: "Kapat" },
						{ div: "ui green button #sendbutton", html: "Gönder" }
					]
				}
			]
		}
	},
	mailform: {
		type: "widgetform",
		selector: "#mailform",
		options: {
			div: "ui form",
			structure: [
				{
					div: "ui basic small buttons", structure: [
						{ div: "ui small button #mailtrbtn", html: "tr-TR" },
						{ div: "ui small button #mailenbtn", html: "en-US" }
					]
				},
				{ div: "field #mailheader" },
				{ div: "field #mailcontent" },
				{ div: "", html: "Gönderen :" },
				{ div: "#mailsender" },
				{ div: "ui error message" }
			]
		}
	},
	mailcontent: {
		type: "textarea",
		selector: "#mailcontent",
		options: {
			div: "ui left icon fluid input",
			rows: 20,
			name: "mail",
			placeholder: "Eposta içeriği"
		}
	},
	mailheader: {
		type: "input",
		selector: "#mailheader",
		options: {
			div: "small ui fluid input",
			type: "text",
			name: "name"
		}
	},
	prompt: {
		type: "prompt",
		selector: "#prompt",
		options: {
			semanticOptions: {
			}
		}
	},
	mailsender: {
		type: "ddown",
		selector: "#mailsender",
		options: {
			oncreate: true,
			name: "mailsender",
			datasource: "seqmailsenderservice",
			div: "ui labeled selection dropdown icon",
			header: [
				{ span: "text" },
				{ icon: "dropdown icon" }
			],
			selected: 1
		}
	}
};

orderListServices = {
	deleteorderservice: {
		source: "ajax",
		url: "deleteOrder"
	},
	editorderservice: {
		source: "ajax",
		url: "editorder"
	}
}

orderServices = {
	insertPrimer: {
		source: "ajax",
		url: "insertPrimer"
	},
	insertProbe: {
		source: "ajax",
		url: "insertProbe"
	},
	insertSeq: {
		source: "ajax",
		url: "insertSeq"
	}
}

addCustomerwidgets = {

	uploadcontainer: {
		type: "container",
		selector: "#uploadcontainer",
		options: {
			div: "content ui transition fade in container",
			structure: [
				{
					label: "small basic ui button", attr: { "for": "excelupload" }, structure: [
						{ icon: "noclass", i: "ui upload icon" },
						{ span: "noclass", html: "Excelden Kullanıcı Yükle" },
						{ input: "#excelupload", attr: { "type": "file", "style": "display: none" } }
					]
				},
			]
		}
	},
}

let productionGeneWidgets = {
	genepooltable: {
		type: "table",
		selector: "#genepooltable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "gene",
				columns: ["id", "name", "userid", "sequence", "orderid", "completed"],
				join: [
					{ table: "users", foreign: "userid", target: "userid" },
					{ table: "orders", foreign: "orderid" },
				],
				filter: {
					where: {
						"order.approval": {
							op: "eq",
							val: true
						},
						"completed": false
					}
				}
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				columns: [
					{ data: "id", visible: false, name: "id", type: "hidden" },
					{ title: "Sipariş #.", data: "order.ordernum", render: "navigateorder" },
					{ title: "Sipariş Tarihi", data: "order.date", render: "momentdate" },
					{ title: "Oligo Adı", data: "name" },
					{ title: "Sekans", data: "sequence", render: "ellipsis3" },
					{ title: "BP", data: null, render: "getbp" },
					{ title: "Kontrol", data: "completed", render: "genebtn" },
				],
				select: false,
				ordering: false,
				rowReorder: {
					dataSrc: 1,
					update: false
				},
				pageLength: 100,
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				pagingType: "full_numbers",
				"language": {
					processing: "Aranıyor...",
					info: "_PAGES_ Sayfadan _PAGE_. gösteriliyor",
					infoFiltered: " - _MAX_ satırdan filtrelendi",
					infoEmpty: "0 satır bulundu",
					infoPostFix: "",
					loadingRecords: "Kayıtlar yükleniyor...",
					zeroRecords: "Kayıt bulunamadı",
					emptyTable: "Tablo boş",
					lengthMenu: "_MENU_ kayıt göster.",
					search: "_INPUT_",
					searchPlaceholder: "Arama",
					select: {
						rows: "%d satır seçildi."
					}
				}
			},
			editor: {
				idSrc: 'id',
				allowed: ["id","completed"]
			}
		}
	}
};

orderdetailsitems.ordercard = Object.assign({}, orderordersitems.ordercard);
orderdetailsitems.primercard = Object.assign({}, orderordersitems.primercard);
orderdetailsitems.primertable = Object.assign({}, orderordersitems.modaltable);
orderdetailsitems.probetable = Object.assign({}, orderordersitems.probetable);
orderdetailsitems.seqtable = Object.assign({}, orderordersitems.seqtable);
orderdetailsitems.genetable = Object.assign({}, orderordersitems.genetable);

let customeredititems = {
	container: {
		type: "widgetform",
		selector: "#maincontainer",
		options: {
			div: "content ui transition fade in container large form",
			structure: [
				{
					div: "ui stacked segment", structure: [
						{
							div: "ui secondary segment", structure: [
								{ p: "noclass", html: "Müşteri Bilgileri" }
							]
						},
						{
							div: "ui segment", structure: [
								{
									div: "ui grid", structure: [
										{
											div: "ui sixteen wide column", structure: [
												{ div: "field #name" },
												{ div: "field #company" },
												{ div: "field #mail" },
												{ div: "field #department" },
												{ div: "field #door" },
												{ div: "field #address" },
												{ div: "field #phone" }
											]
										},
										{ div: "field #passwordinp"},
										{ div: "ui sixteen wide column #billingtable" },
										{ div: "ui four wide column #button_container" },
										{
											div: "ui sixteen wide column", structure: [
												{ div: "ui fluid large teal button #updatebutton", html: "Güncelle" }
											]
										}
									]
								}
							]
						}
					]
				},
				{ div: "ui error message" },
				{
					div: "ui success message hidden", structure: [
						{ div: "header", html: "Güncelleme başarılı." }
					]
				}
			]
		}
	},
	passwordinp : {
		type: "input",
		selector: "#passwordinp",
		options: {
			div: "ui right labeled fluid input",
			type: "text",
			label: {
				label: "ui blue basic label",
			}
		}
	},
	billingtable: {
		type: "table",
		selector: "#billingtable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "billingaddress",
				columns: ["id", "taxoffice", "taxnumber", "address", "project", "natid", "phone", "mail", "userid"],
			},
			oncreate: false,
			table: "ui celled table",
			datatable: {
				lengthChange: true,
				responsive: true,
				select: true,
				dom: '<"top">Brt<"bottom"><"clear">',
				columns: [{ data: "id", visible: false, type: "hidden" },
				{ data: "taxoffice", name: "taxoffice", title: "Vergi Dairesi" },
				{ data: "taxnumber", name: "taxnumber", title: "Vergi No." },
				{ data: "address", name: "address", title: "Adres", width: "20%" },
				{ data: "project", name: "project", title: "Proje" },
				{ data: "natid", name: "natid", title: "TC Kimlik No." },
				{ data: "phone", name: "phone", title: "Telefon" },
				//{ data: "acm_user.username", name: "acm_user.id", title: "Kullanıcı İsmi", type: "select", placeholder: "", editField: ["acm_user.id"] },
				{ data: "mail", name: "mail", title: "E-posta" },
				{ data: "userid", name: "userid", visible: false, type: "hidden" },
				],
				select: {
					style: 'os',
					className: 'active'
				},
				buttons: [
					{
						extend: "create", editor: true, text: "Yeni"
						, formTitle: "Yeni fatura girişi oluştur."
					},
					{
						extend: "edit", editor: true, text: "Güncelle"
						, formTitle: "Seçili fatura girişini değiştir."
					},
					{
						extend: "remove", editor: true, text: "Sil"
						, formMessage: "Seçili fatura girişini silmek istediğinize emin misiniz?"
						, formTitle: "Sil"
					}
				]
			},
			editor: {
				/*
				bubble: {
					submit: "allIfChanged",
					selector: "tbody td:not(:last-child)"
				},*/
				idSrc: 'id'
			}
		}
	}
};

let adminregisterinputbase = {
	type: "input",
	options: {
		div: "ui right labeled fluid input",
		type: "text",
		label: {
			label: "ui blue basic label",
		}
	}
};

let adminregisterinputs = [
	{ id: "name", placeholder: "Adınızı Soyadınızı Giriniz", label: "Ad Soyad" },
	{ id: "company", placeholder: "Kurumunuzun Adını Giriniz", label: "Kurum" },
	{ id: "mail", placeholder: "E-posta Adresinizi Giriniz", label: "E-posta", type: "mail" },
	{ id: "department", placeholder: "Bölümünüzü Giriniz", label: "Bölüm" },
	{ id: "door", placeholder: "Oda Numaranızı Giriniz", label: "Oda Numarası" },
	{ id: "address", placeholder: "Teslimat Adresinizi Giriniz", label: "Teslimat Adresi" },
	{ id: "phone", placeholder: "Telefon Numaranızı Giriniz", label: "Telefon" }
];

adminregisterinputs.forEach(function (i) {
	let wdg = JSON.parse(JSON.stringify(adminregisterinputbase));
	wdg.selector = "#" + i.id;
	if (i.type) wdg.options.type = i.type;
	wdg.options.placeholder = i.placeholder;
	wdg.options.name = i.id;
	if (i.label && wdg.options.label) wdg.options.label.html = i.label;
	registerpage.widgets[i.id] = wdg;
	customeredititems[i.id] = wdg;
	customeredititems[i.id].options.datasource = "tableService";
	customeredititems[i.id].options.fetchparams = {
		table: "users",
		columns: [i.id]
	};
	customeredititems[i.id].options.oncreate = false;
});

customerpitems = {
	container: {
		type: "widgetform",
		selector: "#maincontainer",
		options: {
			div: "below_navbar ui content container",
			structure: [
				{
					div: "ui stacked segment", structure: [
						{
							div: "ui secondary segment", structure: [
								{ p: "noclass", html: "Müşteri Pwd" }
							]
						},
						{
							div: "ui segment", structure: [
								{
									div: "ui grid", structure: [
										{ div: "ui sixteen wide column #pwdtable" },
									]
								}
							]
						}
					]
				}
			]
		}
	},

	pwdtable: {
		type: "table",
		selector: "#pwdtable",
		options: {
			datasource: "editorService",
			fetchparams: {
				table: "acm_users",
				columns: ["id", "username", "pwd"],
				join: [
					{ table: "users", foreign: "id", target: "userid" }
				]
			},
			oncreate: true,
			table: "ui celled table",
			datatable: {
				columns: [
					{ data: "id", visible: false, type: "hidden" },
					{ data: "username", name: "username", title: "Kullanıcı Giriş E-mail" },
					{ data: "pwd", name: "pwd", title: "Şifre" },
					{ data: "user.name",name:"user.name",title:"Kullanıcı Adı",render:"nullrender"},
					{ data: "user.company",name:"user.company",title:"Kullanıcı Şirket",render:"nullrender"},
				],
				rowReorder: {
					dataSrc: 0,
					update: false
				},
				select: {
					style: 'os',
					className: 'active'
				},
				pageLength: 10,
				lengthChange: false,
				fixedHeader: true,
				responsive: true,
				pagingType: "full_numbers",
				"language": {
					processing: "Aranıyor...",
					info: "_PAGES_ Sayfadan _PAGE_. gösteriliyor",
					infoFiltered: " - _MAX_ satırdan filtrelendi",
					infoEmpty: "0 satır bulundu",
					infoPostFix: "",
					loadingRecords: "Kayıtlar yükleniyor...",
					zeroRecords: "Kayıt bulunamadı",
					emptyTable: "Tablo boş",
					lengthMenu: "_MENU_ kayıt göster.",
					search: "_INPUT_",
					searchPlaceholder: "Arama",
					select: {
						rows: "%d satır seçildi."
					}
				}
			},
			editor: {
				idSrc: 'id',
				allowed: ["id"]
			}
		}
	}
};


let pages = {
	login: loginpage,
	register: registerpage,
	primer: {
		order: {
			widgets: Object.assign({}, ordernavbaritems),
			services: Object.assign({}, ordernavbarservices),
			functions: Object.assign({}, ordernavbarfuncs)
		}
	},
	probe: {
		order: {
			widgets: Object.assign({}, ordernavbaritems),
			services: Object.assign({}, ordernavbarservices),
			functions: Object.assign({}, ordernavbarfuncs)
		}
	},
	sequence: {
		order: {
			widgets: Object.assign({}, ordernavbaritems),
			services: Object.assign({}, ordernavbarservices),
			functions: Object.assign({}, ordernavbarfuncs)
		}
	},
	orders: {
		order: {
			widgets: Object.assign({}, orderordersitems, ordernavbaritems),
			services: Object.assign({}, ordersServices, tableServices, ordernavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	dashboard: {
		order: {
			widgets: Object.assign({}, ordernavbaritems, orderdashboarditems),
			services: Object.assign({}, tableServices, ordernavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	customer: {
		order: {
			widgets: Object.assign({}, ordernavbaritems, ordercustomeritems),
			services: Object.assign({}, tableServices, ordernavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	password: {
		order: {
			widgets: Object.assign({}, ordernavbaritems, passwordwidgets),
			services: Object.assign({}, ordernavbarservices, pwdservices),
			functions: Object.assign({}, ordernavbarfuncs)
		},
		production: {
			widgets: Object.assign({}, productionnavbaritems, passwordwidgets),
			services: Object.assign({}, productionnavbarservices, pwdservices),
			functions: Object.assign({}, ordernavbarfuncs)
		},
		seqproduction: {
			widgets: Object.assign({}, seqproductionnavbaritems, passwordwidgets),
			services: Object.assign({}, seqproductionnavbarservices, pwdservices),
			functions: Object.assign({}, ordernavbarfuncs)
		},
		admin: {
			widgets: Object.assign({}, adminnavbaritems, passwordwidgets),
			services: Object.assign({}, adminnavbarservices, pwdservices),
			functions: Object.assign({}, ordernavbarfuncs)
		}
	},
	productionOrderList: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, productionOrderListItems),
			services: Object.assign({}, productionnavbarservices, tableServices, mailServices, orderListServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		},
		seqproduction : {
			widgets: Object.assign({}, seqproductionnavbaritems, seqproductionOrderListItems),
			services: Object.assign({}, seqproductionnavbarservices, tableServices, mailServices, orderListServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	productionOrderDetails: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, productionorderdetailwidgets),
			services: Object.assign({}, productionnavbarservices, ordersServices, tableServices, orderListServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		},
		seqproduction: {
			widgets: Object.assign({}, seqproductionnavbaritems, productionorderdetailwidgets),
			services: Object.assign({}, seqproductionnavbarservices, ordersServices, tableServices, orderListServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}

	},
	productionSynthReport: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, productionreporswidgetsall, productionreportwidgets),
			services: Object.assign({}, productionnavbarservices, productionServices, tableServices, synthlistservices),
			functions: Object.assign({}, productionFuncs, tableFuncs, ordernavbarfuncs)
		}/*
		,admin: {
			widgets: Object.assign({}, productionnavbaritems, productionreportwidgets),
			services: Object.assign({}, productionnavbarservices, productionServices, tableServices),
			functions: Object.assign({}, productionFuncs, tableFuncs, ordernavbarfuncs)
		}*/
	},
	productionSynthReportProbe: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, productionreporswidgetsall, productionreportwidgetsp),
			services: Object.assign({}, productionnavbarservices, productionServices, tableServices, synthlistservices),
			functions: Object.assign({}, productionFuncs, tableFuncs, ordernavbarfuncs)
		}
	},
	productionOldSyntheses: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, productionoldwidgets),
			services: Object.assign({}, productionnavbarservices, tableServices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		},
		admin: {
			widgets: Object.assign({}, productionnavbaritems, productionoldwidgets),
			services: Object.assign({}, productionnavbarservices, tableServices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	confirmprimer: {
		order: {
			widgets: Object.assign({}, ordernavbaritems),
			services: Object.assign({}, ordernavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	confirmprobe: {
		order: {
			widgets: Object.assign({}, ordernavbaritems),
			services: Object.assign({}, ordernavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	confirmsequence: {
		order: {
			widgets: Object.assign({}, ordernavbaritems),
			services: Object.assign({}, ordernavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	productionPrimerPool: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, primerpoolwidgets),
			services: Object.assign({}, productionnavbarservices, tableServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	productionProbePool: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, probepoolwidgets),
			services: Object.assign({}, productionnavbarservices, tableServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	productionSynthList: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, nextsyntheseswidgets),
			services: Object.assign({}, productionnavbarservices, tableServices, synthlistservices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	productionSynthListProbe: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, nextsyntheseswidgetsprobe),
			services: Object.assign({}, productionnavbarservices, tableServices, synthlistservices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	productionSynthesis: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, productionsyntheseswidgets),
			services: Object.assign({}, productionnavbarservices, tableServices, synthlistservices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	productionSynthesisProbe: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, productionsyntheseswidgetsp),
			services: Object.assign({}, productionnavbarservices, tableServices, synthlistservices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	viewCustomerList: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, customerlistitems),
			services: Object.assign({}, productionnavbarservices, tableServices, orderServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		},
		seqproduction: {
			widgets: Object.assign({}, seqproductionnavbaritems, customerlistitems),
			services: Object.assign({}, seqproductionnavbarservices, tableServices, orderServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		},
		admin: {
			widgets: Object.assign({}, adminnavbaritems, customerlistitems),
			services: Object.assign({}, adminnavbarservices, tableServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	viewOrderList: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, orderlistitems),
			services: Object.assign({}, productionnavbarservices, tableServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		},
		admin: {
			widgets: Object.assign({}, adminnavbaritems, orderlistitems),
			services: Object.assign({}, adminnavbarservices, tableServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		},
		seqproduction: {
			widgets: Object.assign({}, seqproductionnavbaritems, orderlistitems),
			services: Object.assign({}, seqproductionnavbarservices, tableServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	viewOrderDetails: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, orderdetailsitems),
			services: Object.assign({}, productionnavbarservices, tableServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		},
		admin: {
			widgets: Object.assign({}, adminnavbaritems, orderdetailsitems),
			services: Object.assign({}, adminnavbarservices, tableServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	faq: {
		order: {
			widgets: Object.assign({}, ordernavbaritems),
			services: Object.assign({}, ordernavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	addCustomer: {
		production: {
			widgets: Object.assign({}, productionnavbaritems, registerpage.widgets, addCustomerwidgets),
			services: Object.assign({}, productionnavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		},
		seqproduction: {
			widgets: Object.assign({}, seqproductionnavbaritems, registerpage.widgets, addCustomerwidgets),
			services: Object.assign({}, seqproductionnavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	customerReport: {
		production: {
			widgets: Object.assign({}, productionnavbaritems),
			services: Object.assign({}, productionnavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		},
		admin: {
			widgets: Object.assign({}, adminnavbaritems),
			services: Object.assign({}, adminnavbarservices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	synthstats: {
		production: {
			widgets: Object.assign({}, productionnavbaritems),
			services: Object.assign({}, productionnavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		},
		admin: {
			widgets: Object.assign({}, adminnavbaritems),
			services: Object.assign({}, adminnavbarservices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	delivery: {
		admin: {
			widgets: Object.assign({}, adminnavbaritems),
			services: Object.assign({}, adminnavbarservices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	deliveryOrderList: {
		admin: {
			widgets: Object.assign({}, adminnavbaritems),
			services: Object.assign({}, adminnavbarservices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	deliveryOrderDetails: {
		admin: {
			widgets: Object.assign({}, adminnavbaritems),
			services: Object.assign({}, adminnavbarservices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	cargo: {
		admin: {
			widgets: Object.assign({}, adminnavbaritems),
			services: Object.assign({}, adminnavbarservices, tableServices, trackingServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	confirmuserprimer: {
		order: {
			widgets: Object.assign({}, productionnavbaritems),
			services: Object.assign({}, productionnavbarservices, tableServices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		},
		production: {
			widgets: Object.assign({}, productionnavbaritems),
			services: Object.assign({}, productionnavbarservices, tableServices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	confirmuserprobe: {
		order: {
			widgets: Object.assign({}, productionnavbaritems),
			services: Object.assign({}, productionnavbarservices, tableServices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		},
		production: {
			widgets: Object.assign({}, productionnavbaritems),
			services: Object.assign({}, productionnavbarservices, tableServices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	confirmusersequence: {
		order: {
			widgets: Object.assign({}, productionnavbaritems),
			services: Object.assign({}, productionnavbarservices, tableServices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		},
		production: {
			widgets: Object.assign({}, productionnavbaritems),
			services: Object.assign({}, productionnavbarservices, tableServices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	modification: {
		admin: {
			widgets: Object.assign({}, adminnavbaritems),
			services: Object.assign({}, adminnavbarservices, tableServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	coupon: {
		admin: {
			widgets: Object.assign({}, adminnavbaritems),
			services: Object.assign({}, adminnavbarservices, tableServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	gene: {
		order: {
			widgets: Object.assign({}, ordernavbaritems),
			services: Object.assign({}, ordernavbarservices),
			functions: Object.assign({}, ordernavbarfuncs)
		}
	},
	confirmgene: {
		order: {
			widgets: Object.assign({}, ordernavbaritems),
			services: Object.assign({}, ordernavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	productionGene: {
		seqproduction: {
			widgets: Object.assign({}, seqproductionnavbaritems,productionGeneWidgets),
			services: Object.assign({}, seqproductionnavbarservices, tableServices,geneservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	cargodetails: {
		admin: {
			widgets: Object.assign({}, adminnavbaritems,cargodetailswidgets),
			services: Object.assign({}, adminnavbarservices, tableServices,trackingServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	customeredit: {
		admin: {
			widgets: Object.assign({}, adminnavbaritems, customeredititems),
			services: Object.assign({}, adminnavbarservices, tableServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	},
	uploadtest: {
		order: {
			widgets: Object.assign({}, ordernavbaritems),
			services: Object.assign({}, ordernavbarservices),
			functions: Object.assign({}, tableFuncs, ordernavbarfuncs)
		}
	},
	customerp: {
		admin: {
			widgets: Object.assign({}, adminnavbaritems, customerpitems),
			services: Object.assign({}, adminnavbarservices, tableServices),
			functions: Object.assign({}, ordernavbarfuncs, tableFuncs)
		}
	}
};
module.exports = pages;