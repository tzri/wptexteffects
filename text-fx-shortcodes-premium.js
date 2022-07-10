/**
 * WordPress Text Effects
 */
(function($) {
    const PI = 13.1415;
    const REFRESH_SPEED = 115;
    const ANIMATION_SPEED = 0.025;

    const waveFx = new WaveFx();
	const spinFx = new SpinFx();	
	const zoomFx = new ZoomFx();
	const spellFx = new SpellFx();
	const rotateFx = new RotateFx();
	const typeFx = new TypeWriterFx();
	const discoFx = new DiscoCharsFx();
	const crazyFx = new CrazyCharsFx();
	const mockFx = new MockedTextFx();
	
    function WaveFx() {
        this.timeline = 0;
        this.texts = [];
        this.previousTime = 0;
        
        let self = this;
        
        WaveFx.prototype.start = function() {
            $(".text-fx-shortcodes-premium-wave").each(function(i, element) {
                let waveText = new WaveText($(element));
                waveText.init($(element));
                waveFx.texts.push(waveText);
            });
            waveFx.wave();
        };

        WaveFx.prototype.wave = function() {
            let time = performance.now();
            let delta = (time - this.previousTime) / 1000;

            $.each(this.texts, function(i, textElement) {
                textElement.wave(delta);
            });

            this.previousTime = time;
            setTimeout(function() {
                waveFx.wave();
            }, REFRESH_SPEED);
        };

        function WaveText($textElement) {
            this.$textElement = $textElement;
            this.$fxChars;
            
            let self = this;

            WaveText.prototype.init = function($textElement) {
                let text = $textElement.text();
                let resultHtml = "";
                for (let i = 0; i < text.length; i++) {
                    let relativePosition = getRelativePosition(i, text.length);

                    let symbol = text[i].replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                        return "&#" + i.charCodeAt(0) + ";";
                    });

                    resultHtml += createCharacterSpanHtml(relativePosition, symbol, 'fx-char-wave');
                    if (isEndingCharacter(text[i])) {
                        resultHtml += createCharacterSpanHtml(
                            relativePosition,
                            "&nbsp;",
							'fx-char-wave'
                        );
                    }
                }
                $textElement.html(resultHtml);
                this.$fxChars = $textElement.find(".fx-char-wave");
            };

            WaveText.prototype.wave = function(delta) {
                this.$fxChars.each(function(i) {
                    let relativePosition = $(this).data("rel-position");
                    if (!relativePosition) {
						relativePosition = 0.01;
					}
					let lineHeight = parseFloat($(this).css("line-height"));
					if (!lineHeight) {
						lineHeight = 5;
					}
                    let distance =
                        Math.sin(waveFx.timeline + (relativePosition + 0.1) * 2.5) * lineHeight * 0.33;
					
					$(this).css({
						"transform": "translateY(" + distance + "px)",
						"-ms-transform": "translateY(" + distance + "px)",
						"-webkit-transform": "translateY(" + distance + "px)"
					});
                    waveFx.timeline += ANIMATION_SPEED * delta * 7.77;
                });
            };
        }
    }
	
    function TypeWriterFx() {
        this.timeline = 0;
        this.texts = [];
        this.previousTime = 0;
        
        let self = this;
        
        TypeWriterFx.prototype.start = function() {
            $(".text-fx-shortcodes-premium-type").each(function(i, element) {
                let typeWriterText = new TypeText($(element));
                typeWriterText.init($(element));
                typeFx.texts.push(typeWriterText);
            });
            typeFx.type();
        };

        TypeWriterFx.prototype.type = function() {
            let time = performance.now();
            let delta = (time - this.previousTime) / 1000;

            $.each(this.texts, function(i, textElement) {
                textElement.type(delta);
            });

            this.previousTime = time;
            setTimeout(function() {
                typeFx.type();
            }, REFRESH_SPEED);
        };

        function TypeText($textElement) {
            this.$textElement = $textElement;
            this.$fxChars;
            this.currentPosition = 0;
			
            let self = this;

            TypeText.prototype.init = function($textElement) {
                let text = $textElement.text();
                let resultHtml = "";
                for (let charIndex = 0; charIndex < text.length; charIndex++) {

                    let symbol = text[charIndex].replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                        return "&#" + i.charCodeAt(0) + ";";
                    });

                    resultHtml += createCharacterSpanHtmlHidden(charIndex, symbol, 'fx-char-type');
                    if (isEndingCharacter(text[charIndex])) {
                        resultHtml += createCharacterSpanHtmlHidden(
                            charIndex,
                            "&nbsp;",
							'fx-char-type'
                        );
                    }
                }
                $textElement.html(resultHtml);
                this.$fxChars = $textElement.find(".fx-char-type");
            };

            TypeText.prototype.type = function(delta) {
				let newPosition = Math.floor(typeFx.timeline * 100);
				this.currentPosition = newPosition;
				
				this.$fxChars.each(function(i) {                    
					if (self.currentPosition > $(this).data('rel-position')) {
						$(this).css('visibility', 'visible');
					}					
                });

				if (newPosition > self.$fxChars.size()) {
					typeFx.timeline = 0;
					this.$fxChars.each(function(i) {
						$(this).css('visibility', 'hidden');
					});
				}
				
				let randomSpeedChange = 1 + Math.random() * 2.777;
				
				typeFx.timeline += ANIMATION_SPEED * delta * randomSpeedChange;
            };
        }
    }
	
    function CrazyCharsFx() {
        this.texts = [];
  
        let self = this;
        
        CrazyCharsFx.prototype.start = function() {
            $(".text-fx-shortcodes-premium-crazy").each(function(i, element) {
                let crazyText = new CrazyText($(element));
                crazyText.init($(element));
                crazyFx.texts.push(crazyText);
            });
            crazyFx.goCrazy();
        };

        CrazyCharsFx.prototype.goCrazy = function() {
            $.each(this.texts, function(i, textElement) {
                textElement.changeSize();
            });

            setTimeout(function() {
                crazyFx.goCrazy();
            }, REFRESH_SPEED);
        };

        function CrazyText($textElement) {
            this.$textElement = $textElement;
            this.$fxChars;
			
            let self = this;

            CrazyText.prototype.init = function($textElement) {
                let text = $textElement.text();
                let resultHtml = "";
                for (let charIndex = 0; charIndex < text.length; charIndex++) {

                    let symbol = text[charIndex].replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                        return "&#" + i.charCodeAt(0) + ";";
                    });

                    resultHtml += createCharacterSpanHtml(charIndex, symbol, 'fx-char-crazy');
                    if (isEndingCharacter(text[charIndex])) {
                        resultHtml += createCharacterSpanHtml(
                            charIndex,
                            "&nbsp;",
							'fx-char-crazy'
                        );
                    }
                }
                $textElement.html(resultHtml);
                this.$fxChars = $textElement.find(".fx-char-crazy");
            };

            CrazyText.prototype.changeSize = function() {
				this.$fxChars.each(function(i) {                    
					let size = 0.9 + Math.random() * 0.5;
					$(this).css({
						"transform": "scale(" + size + "," + size + ")",
						"-ms-transform": "scale(" + "," + size + ")",
						"-webkit-transform": "scale(" + "," + size + ")"
					});			
                });
            };
        }
    }	
	
	
    function MockedTextFx() {
        this.texts = [];
  
        let self = this;
        
        MockedTextFx.prototype.start = function() {
            $(".text-fx-shortcodes-premium-mock").each(function(i, element) {
                let mockedText = new MockedText($(element));
                mockedText.init($(element));
                mockFx.texts.push(mockedText);
            });
            mockFx.mockText();
        };

        MockedTextFx.prototype.mockText = function() {
            $.each(this.texts, function(i, textElement) {
                textElement.changeStyle();
            });
        };

        function MockedText($textElement) {
            this.$textElement = $textElement;
            this.$fxChars;
			
            let self = this;

            MockedText.prototype.init = function($textElement) {
                let text = $textElement.text();
                let resultHtml = "";
                for (let charIndex = 0; charIndex < text.length; charIndex++) {

                    let symbol = text[charIndex].replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                        return "&#" + i.charCodeAt(0) + ";";
                    });

                    resultHtml += createCharacterSpanHtml(charIndex, symbol, 'fx-char-mock');
                    if (isEndingCharacter(text[charIndex])) {
                        resultHtml += createCharacterSpanHtml(
                            charIndex,
                            "&nbsp;",
							'fx-char-mock'
                        );
                    }
                }
                $textElement.html(resultHtml);
                this.$fxChars = $textElement.find(".fx-char-mock");
            };

            MockedText.prototype.changeStyle = function() {
				this.$fxChars.each(function(i) {                    
					if (Math.random() > 0.5) {
						$(this).css('text-transform', 'uppercase');			
					} 
					else {
						$(this).css('text-transform', 'lowercase');			
					}
                });
            };
        }
    }		
	
    function DiscoCharsFx() {
        this.texts = [];
		
		let self = this;
        
        DiscoCharsFx.prototype.start = function() {
            $(".text-fx-shortcodes-premium-disco").each(function(i, element) {
                let discoText = new DiscoText($(element));
                discoText.init($(element));
                discoFx.texts.push(discoText);
            });
            discoFx.disco();
        };

        DiscoCharsFx.prototype.disco = function() {
             $.each(this.texts, function(i, textElement) {
                textElement.disco();
            });

            setTimeout(function() {
                discoFx.disco();
            }, REFRESH_SPEED);
        };

        function DiscoText($textElement) {
            this.$textElement = $textElement;
            this.$fxChars;
			
            let self = this;

            DiscoText.prototype.init = function($textElement) {
                let text = $textElement.text();
                let resultHtml = "";
                for (let charIndex = 0; charIndex < text.length; charIndex++) {

                    let symbol = text[charIndex].replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                        return "&#" + i.charCodeAt(0) + ";";
                    });

                    resultHtml += createCharacterSpanHtml(charIndex, symbol, 'fx-char-disco');
                    if (isEndingCharacter(text[charIndex])) {
                        resultHtml += createCharacterSpanHtml(
                            charIndex,
                            "&nbsp;",
							'fx-char-disco'
                        );
                    }
                }
                $textElement.html(resultHtml);
                this.$fxChars = $textElement.find(".fx-char-disco");
            };

            DiscoText.prototype.disco = function() {			
				this.$fxChars.each(function() {                    				
					let red = Math.random() * 255;
					let green = Math.random() * 255;
					let blue = Math.random() * 255;
					$(this).css('color', 'rgb(' + red + ',' + green + ',' + blue + ')');				
                });
            };
        }
    }
		
	
    function SpellFx() {
        this.timeline = 0;
        this.texts = [];
        this.previousTime = 0;
        
        let self = this;
        
        SpellFx.prototype.start = function() {
            $(".text-fx-shortcodes-premium-spell").each(function(i, element) {
                let spellText = new SpellText($(element));
                spellText.init($(element));
                spellFx.texts.push(spellText);
            });
            spellFx.spell();
        };

        SpellFx.prototype.spell = function() {
            let time = performance.now();
            let delta = (time - this.previousTime) / 1000;

            $.each(this.texts, function(i, textElement) {
                textElement.spell(delta);
            });

            this.previousTime = time;
            setTimeout(function() {
                spellFx.spell();
            }, REFRESH_SPEED);
        };

        function SpellText($textElement) {
            this.$textElement = $textElement;
            this.$fxChars;
			this.fxLetterIndex = 0;
			this.latestSwitchTime = 0;
			this.timeline = 0;
			this.letterSizeIndex = 1;
			this.scaleSleep = 5;
            
            let self = this;

            SpellText.prototype.init = function($textElement) {
                let text = $textElement.text();
                let resultHtml = "";
                for (let i = 0; i < text.length; i++) {
                    let relativePosition = getRelativePosition(i, text.length);

                    let symbol = text[i].replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                        return "&#" + i.charCodeAt(0) + ";";
                    });

                    resultHtml += createCharacterSpanHtml(relativePosition, symbol, 'fx-char-spell');
                    if (isEndingCharacter(text[i])) {
                        resultHtml += createCharacterSpanHtml(
                            relativePosition,
                            "&nbsp;",
							'fx-char-spell'
                        );
                    }
                }

                $textElement.html(resultHtml);
                this.$fxChars = $textElement.find(".fx-char-spell");
            };

            SpellText.prototype.spell = function(delta) {
                this.$fxChars.each(function(i) {
                    if (self.scaleSleep > 0) {
						self.scaleSleep -= delta;
						return;
					}				
					
					let size = 1 + self.timeline * 1.5;
					
					if (i > self.fxLetterIndex) {
						size = 1;
					}
					
					if (i < self.fxLetterIndex) {
						size = 2;
					}
					
					if (size > 2) {
						size = 2;
					}
					
					$(this).css({
						"transform": "scale(" + size + "," + size + ")",
						"-ms-transform": "scale(" + "," + size + ")",
						"-webkit-transform": "scale(" + "," + size + ")"
					});

					if (self.latestSwitchTime + 1 < self.timeline) {
						self.fxLetterIndex++;
						if (self.fxLetterIndex > self.$fxChars.size()) {
							self.fxLetterIndex = 0;
							self.letterSizeIndex = 1;
							self.scaleSleep = 3;							
						}
						if (self.fxLetterIndex === self.$fxChars.size()) {
							self.scaleSleep = 15;
						}
						self.timeline = 0;
						self.latestSwitchTime = self.timeline;
					}
					
					self.letterSizeIndex += delta * 0.5;
                    self.timeline += ANIMATION_SPEED * delta * 9.99;
                });
            };
        }
    }	
	
	function ZoomFx() {
        this.timeline = 0;
        this.texts = [];
        this.previousTime = 0;
        
        let self = this;
        
        ZoomFx.prototype.start = function() {
            $(".text-fx-shortcodes-premium-zoom").each(function(i, element) {
                let zoomText = new ZoomText($(element));
                zoomText.init($(element));
                zoomFx.texts.push(zoomText);
            });
            zoomFx.zoomLetters();
        };

        ZoomFx.prototype.zoomLetters = function() {
            let time = performance.now();
            let delta = (time - this.previousTime) / 1000;
			
            $.each(zoomFx.texts, function(i, textElement) {
                textElement.zoom(delta);
            });

            this.previousTime = time;
            setTimeout(function() {
                zoomFx.zoomLetters();
            }, REFRESH_SPEED);
        };

        function ZoomText($textElement) {
            this.$textElement = $textElement;
            this.$fxChars;
            
            let self = this;

            ZoomText.prototype.init = function($textElement) {
                let text = $textElement.text();
                let resultHtml = "";
                for (let i = 0; i < text.length; i++) {
                    let relativePosition = getRelativePosition(i, text.length);

                    let symbol = text[i].replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                        return "&#" + i.charCodeAt(0) + ";";
                    });

                    resultHtml += createCharacterSpanHtml(relativePosition, symbol, 'fx-char-zoom');
                    if (isEndingCharacter(text[i])) {
                        resultHtml += createCharacterSpanHtml(
                            relativePosition,
                            "&nbsp;",
							'fx-char-zoom'
                        );
                    }
                }
                $textElement.html(resultHtml);
                self.$fxChars = $textElement.find(".fx-char-zoom");
            };

            ZoomText.prototype.zoom = function(delta) {
                this.$fxChars.each(function(i) {
                    let relativePosition = $(this).data("rel-position");
                    if (!relativePosition) {
						relativePosition = 0.01;
					}

                    let size =
                        Math.abs(Math.sin(zoomFx.timeline + relativePosition * 3)) + 0.888;
					
					$(this).css({
						"transform": "scale(" + size + "," + size + ")",
						"-ms-transform": "scale(" + "," + size + ")",
						"-webkit-transform": "scale(" + "," + size + ")"
					});
                    zoomFx.timeline += ANIMATION_SPEED * delta * 7.77;
                });
            };
        }
    }
	
	function SpinFx($textElement) {
		this.$fxChars;			
		this.previousTime = 0;
		
		let self = this;
		
		 SpinFx.prototype.start = function() {
			$(".text-fx-shortcodes-premium-spin").each(function(i, element) {
				let rotateText = spinFx.init($(element));
			});
		};

		SpinFx.prototype.init = function($textElement) {
			let text = $textElement.text();
			let resultHtml = "";
			for (let i = 0; i < text.length; i++) {
				let relativePosition = getRelativePosition(i, text.length);

				let symbol = text[i].replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
					return "&#" + i.charCodeAt(0) + ";";
				});

				resultHtml += createCharacterSpanHtml(relativePosition, symbol, 'fx-char-spin');
				if (isEndingCharacter(text[i])) {
					resultHtml += createCharacterSpanHtml(
						relativePosition,
						"&nbsp;"
					);
				}
			}

			$textElement.html(resultHtml);
			
			const rotationValue = 360 * $textElement.data('rel-position');
			
			$textElement.css({
					"transform": "rotate(" + rotationValue + "deg)",
					"-ms-transform": "rotate(" + rotationValue + "deg)",
					"-webkit-transform": "rotate(" + rotationValue + "deg)"
				});
			
			self.$fxChars = $textElement.find(".fx-char-spin");
		};

	}	
	
    function RotateFx() {
        this.timeline = 0;
        this.texts = [];
        this.previousTime = 0;
        
        let self = this;
        
        RotateFx.prototype.start = function() {
            $(".text-fx-shortcodes-premium-rotate").each(function(i, element) {
                let rotateText = new RotateText($(element));
                rotateText.init($(element));
				rotateFx.texts.push(rotateText);
            });
            rotateFx.rotate();
        };

        RotateFx.prototype.rotate = function() {
            let time = performance.now();
            let delta = (time - this.previousTime) / 1000;

            $.each(this.texts, function(i, textElement) {
				textElement.rotate(delta);
            });

            this.previousTime = time;
            setTimeout(function() {
                rotateFx.rotate();
            }, REFRESH_SPEED);
        };

        function RotateText($textElement) {
			this.$textElement = $textElement;
            this.$fxChars;
			this.timeline = 0;
			this.pauseStartTime = 0;
            
            let self = this;

            RotateText.prototype.init = function($textElement) {
                let text = $textElement.text();
                let resultHtml = "";
                for (let i = 0; i < text.length; i++) {
                    let relativePosition = Math.floor(Math.random() * text.length) + 1;

                    let symbol = text[i].replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                        return "&#" + i.charCodeAt(0) + ";";
                    });

                    resultHtml += createCharacterSpanHtml(relativePosition, symbol, 'fx-char-rotate');
                    if (isEndingCharacter(text[i])) {
                        resultHtml += createCharacterSpanHtml(
                            relativePosition,
                            "&nbsp;",
							'fx-char-rotate'
                        );
                    }
                }

                $textElement.html(resultHtml);
                this.$fxChars = $textElement.find(".fx-char-rotate");
            };

            RotateText.prototype.rotate = function(delta) {
				if (self.pauseDuration < 0.15) {
					self.pauseDuration += ANIMATION_SPEED * delta * 3;
					self.timeline += ANIMATION_SPEED * delta * 3;
					return;
				}
					
				this.$fxChars.each(function(i, e) {
					let rotationValue = (self.timeline % 360) + 360 * ($(e).data('rel-position') / self.$fxChars.size());	

					$(e).css({
						"transform": "rotate(" + rotationValue + "turn)",
						"-ms-transform": "rotate(" + rotationValue + "turn)",
						"-webkit-transform": "rotate(" + rotationValue + "turn)"
					});

                    self.timeline += ANIMATION_SPEED * delta * 3;
                });
				
				if (self.timeline % 10 > 8) {
					self.pauseDuration = 0;
					self.resetRotations();
					self.timeline = 0;
					return;
				}				
            };
			
			RotateText.prototype.resetRotations = function() {
				this.$fxChars.each(function(i, e) {
					$(e).css({
						"transform": "rotate(0turn)",
						"-ms-transform": "rotate(0turn)",
						"-webkit-transform": "rotate(0turn)"
					});				
				});
			}
			
        }
    }		
	
	function SpinFx($textElement) {
		this.$fxChars;			
		this.previousTime = 0;
		
		let self = this;
		
		 SpinFx.prototype.start = function() {
			$(".text-fx-shortcodes-premium-spin").each(function(i, element) {
				let rotateText = spinFx.init($(element));
			});
		};

		SpinFx.prototype.init = function($textElement) {
			let text = $textElement.text();
			let resultHtml = "";
			for (let i = 0; i < text.length; i++) {
				let relativePosition = getRelativePosition(i, text.length);

				let symbol = text[i].replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
					return "&#" + i.charCodeAt(0) + ";";
				});

				resultHtml += createCharacterSpanHtml(relativePosition, symbol, 'fx-char-spin');
				if (isEndingCharacter(text[i])) {
					resultHtml += createCharacterSpanHtml(
						relativePosition,
						"&nbsp;",
						'fx-char-spin'
					);
				}
			}

			$textElement.html(resultHtml);
			
			const rotationValue = 360 * $textElement.data('rel-position');
			
			$textElement.css({
					"transform": "rotate(" + rotationValue + "deg)",
					"-ms-transform": "rotate(" + rotationValue + "deg)",
					"-webkit-transform": "rotate(" + rotationValue + "deg)"
				});
			
			self.$fxChars = $textElement.find(".fx-char-spin");
		};

	}		

    let getRelativePosition = function(index, textLenght) {
		return Math.sin((index / textLenght));
	};

	let isEndingCharacter = function($symbol) {
		return [".", ",", "!", "?", " ", "\t"].includes($symbol);
	};

	let createCharacterSpanHtml = function(
		relativePosition,
		symbol,
		className
	) {
		return (
			'<span data-rel-position="' +
			relativePosition +
			'" class="'+className+'">' +
			symbol +
			"</span>"
		);
	};	
	
	let createCharacterSpanHtmlHidden = function(
		relativePosition,
		symbol,
		className
	) {
		return (
			'<span style="visibility: hidden" data-rel-position="' +
			relativePosition +
			'" class="'+className+'">' +
			symbol +
			"</span>"
		);
	};	
	
	setTimeout(function() {
		waveFx.start(); 
		spinFx.start(); 
		zoomFx.start(); 
		spellFx.start();
		rotateFx.start();
		typeFx.start();
		discoFx.start();
		crazyFx.start();
		mockFx.start();
	}, REFRESH_SPEED);
	
})(jQuery);
