module NavigationHelpers
    def path_to(page_name)
      case page_name
      when /Home View/
        '/home'
      when /History View/
        '/history'
      when /More View/
        '/more'
      when /the settings page/
        '/settings'
      when /the daily earnings settings page/
        '/settings/daily_earnings'
      else
        raise "Can't find mapping from \"#{page_name}\" to a path.\n" +
          "Now, go and add a mapping in #{__FILE__}"
      end
    end
  end
  
  World(NavigationHelpers)