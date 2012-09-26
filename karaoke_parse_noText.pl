#!/usr/bin/perl -w

#####################################
# Copyright 2002, by Mario A Caiti
# Parse a MIDI file's lyric events and timing for use in a karaoke display 
#####################################
     
    use MIDI;
    #to be passed into function as reference-sorry, I mean sub as var. Use CGI for this?
    my $tune="Do You Wanna Know A Secret";
    #@lyric, @cues=karaoke();
    #open LYRIC, ">$tune _.html" || die;
    
    # LYRIC <<EOF;

    sub karaoke
    {
     #first we get text events from the MIDI file itself - and every lyric is followed by a <dtime>. You know how this goes...
        $tuneFile=MIDI::Opus->new({
            "from_file"=>"$tune.mid",
            "event_callback"=>sub{
                push (@stuff, $_[2]),                #push in the ticks second,
                push (@stuff, $_[1])                #and each syllable first
            },   
            "include"=>\@MIDI::Event::Text_events
        }); 
        #@WDO NOT DUPLICATE. NOT FOR RENTAL.		0
        #\nYou'll								551
        #nev								63
    #er								56	(ad nauseum)
        $y=0; $t=0;
        my(@lines, @q);
        # We use this header for use in Flash style CGI; for an HTML file, you can add appropraite tags here or
        # in the carriage return loop. 
        # The first two lines are gonna be copyright information, so here we jump to the part we are going to sing. 
        #$lines[2] .= "&Lyrics=";
        foreach $_(@stuff)
        {  
            if($_ =~ s/([\\\/])//)                                  #find carriage returns
            {                                                                #means a new line is formed
                $q[$y] =$t-$q[$y-1];                    #store each lines' time, need to keep from adding exponentially
                $lines[$y] .= "\<BR\>";
                $y++;
            }
            $lines[$y] .= $_;   
            $t += $_ if($_>0);                                        
        }
        $lines[$y]=~ s/Melody(\S+)/\n/;                            #fix bug where instruments are in last line.
        $lines[$y]=~ s/\%(\S+)/\n/;
        $lines[$y]=~ s/\n(\w+)//;            #and what's left is garbage, so dump that too
        foreach $_(@lines)                    #and lose the trailing numbers in the lyrics...
        {
            $_ =~ s/\d//g;
        }
#        foreach $_(@q)
#        {
#            $_ =~ s/^/&Time=/g;   
#        }
        return (@lines, @q);
    }  
